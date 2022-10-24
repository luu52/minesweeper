Feature: MineSweeper
    As a user
    To define the board display will use:
    "o" hidden cell
    "*" mine
    "!" mined symbol
    "?" uncertain symbol
    "0" empty cell
    "n" cell with number

Background:
Given a user opens the app                                                                                                                                       

Scenario: Default board                                                                                                                         
Then the board should be an 8 x 8

Scenario: Default time counter                                                            
Then the counter should be set to ""


# ---------------------------------------FINISH GAME---------------------------------------

Scenario: If the user reveals a cell that has a mine the game finishes and shows the mine
Given the user loads the following mockData: "ooo-ooo-o*o"
When the user unleash the cell "2-1"
Then the cell "2-1" shows the mine
And the user should lose the game


Scenario: reveal all the bombs that are in the board when the user loses the game 
Given the user loads the following mockData: "**-o*"
When the user unleash the cell "1-1"
Then the cell "1-1" shows the mine
And the cell "0-1" shows the mine
And the cell "0-0" shows the mine


# # ---------------------------------------WIN GAME-------------------------------------------

Scenario: Win the game revealing all the cells that do not contain mines
Given the user loads the following mockData: "***-ooo-***"
When the user unleash the cell "1-0"
And the user unleash the cell "1-1"
And the user unleash the cell "1-2"
Then the user should win the game

# # ---------------------------------------REVEAL CELLS---------------------------------------

Scenario: Revealing an cell without surrounding mines and witout mine -> empty cell
Given the user loads the following mockData: "ooo-ooo-ooo-***"
When the user unleash the cell "1-1"
Then the cell "1-1" should be empty

Scenario: Revealing an empty cell -> discovering the surrounding cells
Given the user loads the following mockData: "ooo-ooo-ooo-***"
When the user unleash the cell "1-1"
Then the board should look like: "000-000-232-ooo"

Scenario: An empty cell revealed by a neightbour, revealling surrounding mines of it
Given the user loads the following mockData: "ooooo-oooo*-ooooo-oooo*-*o*o*"
When the user unleash the cell "1-1"
Then the board should look like: "00011-0001o-00011-1213o-ooooo"

Scenario Outline: Pressing a cell with no mine, showing the number of sorrounding mines
Given the user loads the following mockData: "<mock>"
When the user unleash the cell "1-1"
Then the cell 1-1 shows a "<adjacentMines>"

Examples:
    |      mock      |  adjacentMines   |
    |   *oo-ooo-ooo  |        1         |
    |   **o-ooo-ooo  |        2         |
    |   ***-ooo-ooo  |        3         |
    |   ***-*oo-ooo  |        4         |
    |   ***-*o*-ooo  |        5         |
    |   ***-*o*-*oo  |        6         |
    |   ***-*o*-**o  |        7         |
    |   ***-*o*-***  |        8         | 


# # ---------------------------------------MARKING CELLS-----------------------------------------

Scenario: Mark the cell where the user thinks there is a mine with a mined symbol
When the user marks as mined the cell 1-1
Then the cell 1-1 is marked with the mined symbol


Scenario: Mark the cell where the user doesn't know if there is something with an uncertain symbol
When the user marks as uncertain the cell 1-1
Then the cell 1-1 is marked with a unertainty symbol


# # ---------------------------------------UNMARKING CELLS-----------------------------------------

Scenario: Removing the mined symbol from a cell
Given the user marks as mined the cell 1-1
When the user unmarks the cell 1-1
Then the cell "1-1" should be empty


Scenario: Removing the uncertain symbol from a cell
Given the user marks as uncertain the cell 1-1
When the user unmarks the cell 1-1
Then the cell "1-1" should be empty


# # ---------------------------------------MINE COUNTER SCENARIOS-----------------------------------

Scenario: Set the number of mined symbols in the counter that we can use in the game
Given the user loads the following mockData: "**o-ooo-oo*"
Then then the counter should set to "3"


Scenario: Substract 1 in the counter everytime the user marks a cell with a mined symbol
Given the user loads the following mockData: "**o-ooo-oo*"
When the user marks as mined the cell 1-1
Then then the counter should set to "2"


Scenario: Add 1 in the counter everytime the user removes a cell with a mined symbol
Given the user loads the following mockData: "**o-ooo-oo*"
And the user marks as mined the cell 1-1
When the user unmarks the cell 1-1
Then then the counter should set to "3"


# # ---------------------------------------DISABLE BOARD SCENARIOS-----------------------------------

# Scenario: disable all the board once the user loses the game
# Given the user loads the following mockData: "oo-o*"
# When the user unleash the cell 1-1
# Then all the cells should be disabled

# Scenario: When the user reveals all the empty cells all the board gets disabled
# Given the user loads the following mockData: "**-*o"
# """
# **
# *o
# """
# When the user reveals the cell "2-2"
# Then the cell "1-1" should be disabled
# And the cell "1-2" should be disabled
# And the cell "2-1" should be disabled
# And the cell "2-2" should be disabled

# # ---------------------------------------RESET GAME SCENARIOS--------------------------------------

Scenario: Reset the game
When the user presses the button reset
Then the game resets