import re
from collections import defaultdict

class Token:
    def __init__(self, type_, value, line, column):
        self.type = type_
        self.value = value
        self.line = line
        self.column = column

    def __repr__(self):
        return f"Token({self.type}, {self.value}, {self.line}, {self.column})"

class BuildLangTokenizer:
    TOKEN_SPECIFICATION = [
        ('NAMESPACE', r'[a-zA-Z_]+::'),      # Namespace definition
        ('NUMBER', r'\d+'),                 # Numbers
        ('IDENTIFIER', r'[a-zA-Z_][a-zA-Z0-9_]*'), # Identifiers
        ('OPEN_BRACE', r'\{'),              # Open brace
        ('CLOSE_BRACE', r'\}'),            # Close brace
        ('OPEN_PAREN', r'\('),             # Open parenthesis
        ('CLOSE_PAREN', r'\)'),            # Close parenthesis
        ('ARROW', r'\|'),                  # Arrow
        ('COLON', r':'),                    # Colon
        ('SEMICOLON', r';'),                # Semicolon
        ('COMMA', r','),                    # Comma
        ('COMMENT', r'//.*'),               # Single line comment
        ('WHITESPACE', r'[ \t]+'),         # Spaces and tabs
        ('NEWLINE', r'\n'),                # Line breaks
    ]

    def __init__(self, code):
        self.code = code
        self.tokens = []
        self.current_line = 1
        self.current_column = 1

    def tokenize(self):
        token_regex = '|'.join(f'(?P<{name}>{regex})' for name, regex in self.TOKEN_SPECIFICATION)
        for match in re.finditer(token_regex, self.code):
            kind = match.lastgroup
            value = match.group(kind)
            column = match.start() - self.code.rfind('\n', 0, match.start())
            
            if kind == 'NEWLINE':
                self.current_line += 1
                self.current_column = 1
            elif kind == 'WHITESPACE' or kind == 'COMMENT':
                continue
            else:
                self.tokens.append(Token(kind, value, self.current_line, column))

        return self.tokens

class BuildLangParser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.current_token = None
        self.next_token = None
        self.advance()
        self.graph = defaultdict(dict)

    def advance(self):
        self.current_token = self.next_token
        self.next_token = self.tokens.pop(0) if self.tokens else None

    def parse(self):
        while self.current_token:
            if self.current_token.type == 'NAMESPACE':
                self.parse_namespace()
            else:
                self.error(f"Unexpected token {self.current_token}")

        return self.graph

    def parse_namespace(self):
        namespace = self.current_token.value[:-2]  # Remove the trailing ::
        self.advance()

        if self.current_token.type == 'NUMBER':
            group = self.current_token.value
            self.advance()

            if self.current_token.type == 'COLON':
                self.advance()
                self.parse_group(namespace, group)
            else:
                self.error("Expected ':' after namespace group number")
        else:
            self.error("Expected group number after namespace")

    def parse_group(self, namespace, group):
        while self.current_token and self.current_token.type != 'NAMESPACE':
            if self.current_token.type == 'IDENTIFIER':
                identifier = self.current_token.value
                self.advance()
                
                if self.current_token.type == 'OPEN_BRACE':
                    self.advance()
                    self.graph[namespace][identifier] = self.parse_block()
                else:
                    self.error("Expected '{' after identifier")
            else:
                self.error("Unexpected token in group")

    def parse_block(self):
        block = []
        while self.current_token and self.current_token.type != 'CLOSE_BRACE':
            if self.current_token.type == 'IDENTIFIER':
                block.append(self.current_token.value)
                self.advance()
            elif self.current_token.type == 'SEMICOLON':
                self.advance()
            elif self.current_token.type == 'COMMA':
                self.advance()
            elif self.current_token.type == 'ARROW':
                block.append('|')
                self.advance()
            elif self.current_token.type == 'COMMENT':
                self.advance()
            else:
                self.error("Unexpected token in block")

        if self.current_token and self.current_token.type == 'CLOSE_BRACE':
            self.advance()
        else:
            self.error("Expected '}' to close block")

        return block

    def error(self, message):
        raise SyntaxError(f"{message} at line {self.current_token.line} column {self.current_token.column}")

# Example usage
code = """sn::
0:
hallway_1 {
    042, 043, |hallway_2;
}
"""

def main():
    tokenizer = BuildLangTokenizer(code)
    tokens = tokenizer.tokenize()
    parser = BuildLangParser(tokens)
    graph = parser.parse()
    print(graph)

if __name__ == "__main__":
    main()