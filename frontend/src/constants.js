// src/constants.js
export const languages = {
    javascript: {
      name: 'JavaScript',
      extension: '@codemirror/lang-javascript',
      boilerplate: `// JavaScript Boilerplate
  function main() {
    console.log("Code Collaby - Code Your Thoughts Together");
  }
  main();`,
    },
    cpp: {
      name: 'C++',
      extension: '@codemirror/lang-cpp',
      boilerplate: `// C++ Boilerplate
  #include <iostream>
  using namespace std;
  
  int main() {
      cout << "Code Collaby - Code Your Thoughts Together" << endl;
      return 0;
  }`,
    },
    python: {
      name: 'Python',
      extension: '@codemirror/lang-python',
      boilerplate: `# Python Boilerplate
print("Code Collaby - Code Your Thoughts Together")`,
    },
    java: {
      name: 'Java',
      extension: '@codemirror/lang-java',
      boilerplate: `// Java Boilerplate
  public class Main {
      public static void main(String[] args) {
          System.out.println("Code Collaby - Code Your Thoughts Together");
      }
  }`,
    },
  };
  