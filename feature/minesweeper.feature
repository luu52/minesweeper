Feature: MineSweeper
    As a user
    To define the board display will use:
    "." hidden cell
    "o" shown cell
    "*" mine
    "!" flag
    "?" question mark

Background:
Given a user opens the app

Scenario: Default board
Then the board should be an 8 x 8

# Scenario Outline: Number of flags
# Given the board is shown 
# Then the flag counter should set to <flagCounter>

# Examples:
#     | flagCounter |
#     |     10      |

# Scenario Outline: Clicking the first square
# Given the user opens the app and the board is shown and the difficulty <difficulty> is chosen 
# When the user clicks a random square for the first time <square>
# Then the board clears around the clicked square <clickedSquare> randomly

# Scenario Outline: Generate mines
# Given the user opens the app and has not clicked the first square
# And the difficulty is <difficulty
# When the user clicks the first square <X><Y>
# Then the board generates random <mines> mines