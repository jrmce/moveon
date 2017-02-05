# MoveOn README

MoveOn was created to make it easier to move past closing tokens.

## Features

MoveOn will move your cursor past the defined characters in your MoveOn configuration. By default, MoveOn will move the cursor past `'` and `)`.

MoveOn does not look at anything except the character immediatly after your cursor. If that next character is defined in your `moveOn.moveOnFrom` configuration value, your cursor will be moved immediatly after that character.

## Extension Commands

* `moveOn.disable`: disable MoveOn
* `moveOn.enable`: enable MoveOn

## Extension Configuration

* `moveOn.moveOnFrom`: array of strings that define what characters to "move on" from. By default, `["'", ")"]`
* `moveOn.disabled`: disable MoveOn by default

## Release Notes

### 0.0.1

Initial release
