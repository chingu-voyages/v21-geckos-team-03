# Coding Styles and Conventions

## Purpose

To provide the team with a consistent way to layout and format code for optimal readability. At the end of the day, we have to live with the code each of us writes. If, like journalists, we stick to a specific way to write our code, it will be easier to read, maintain, and further develop.

## Coding Style Guides from Large Companies

- Airbnb JavaScript style guide: https://github.com/airbnb/javascript

- Google HTML/CSS styles guide: https://google.github.io/styleguide/htmlcssguide.html

These are just two of countless examples of coding style guides that organizations use to keep their codebase well-formatted for readability.

We don't need something as elaborate as either of these two examples -- we just need enough coding styles to help us write code that's formatted consistently among all of us as team members.

A big benefit of this approach is that it makes debugging LOTS easier! Instead of hunting through code line-by-line, we'll be able to quickly find the buggy code we need to work on.

The fundamental rules we should agree upon and abide by:

- Syntax
  - Use conventional (old-school) JavaScript syntax?
  - Use ES6 syntax (arrow functions, destructuring, etc.)
- Comments
  - Use of Doc Block comments (/\*_ some comment _/)
  - use of inline comments
- Consistent indentation (applies to HTML/JSX, CSS, and JavaScript)
  - Spaces or tabs? (choose one)
  - How many?
    - 2
    - 4
- Horizontal space between blocks of code (applies to all)
  - No space
  - A single line of space
  - A double line of space
- Bracketing
  - How should JavaScript functions be formatted?
    - opening curly bracket on the same line as args/params
    - opening curly bracket on next line (_ a la_ PHP)
    - closing curly bracket on the last line of function code
    - closing curly bracket on the next line after function code
- Variable Declaration
  - All global variables at top of file (I recommend this -- it's virtually universal)
  - All scoped variables at top of local scope?
  - Variables sorted by type
    - var
    - const
    - let

This isn't an exhaustive list, but it does nail down most of the fundamentals. If I missed anything, add in what I missed. Thanks!
