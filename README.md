A simple adventure game by Eduardo Torres Cruz based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Bedroom, Work, Metro_Station, Boardwalk, Bus, Classroom
- **2+ scenes *not* based on `AdventureScene`**: Real_Intro, Good_Ending, Bad_Ending
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: highlighOnHover() - sets the tint to the object to a eggwhite color when hovered over only(when hovered out it returns to its original color)
    - Enhancement 2: dragInteractive() - makes an object draggable and be 'used' when in contact dragged ontop of another

Experience requirements:
- **4+ locations in the game world**: Bedroom, Work(Starbucks), Metro_Station, Boardwalk, Bus, Classroom
- **2+ interactive objects in most scenes**: apron, wallet, computer, *drink ingredients and cup*
- **Many objects have `pointerover` messages**: All objects have a pointover message describing it via the message on the right along with the cursor changing and it being highlighted.
- **Many objects have `pointerdown` effects**: All objects in the bedroom scene have the gainItem tween applied, drink ingredients in work scene are draggable on pointerdown.
- **Some objects are themselves animated**: All objects in the bedroom scene have the gainItem tween applied, text in endings are animated to be seen as though typed.

Asset sources:
1. bedroom.png
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
2. starbucks.png
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
3. metro_station.png
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
4. boardwalk.png 
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
5. inside_bus.png
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
6. classroom.png
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
7. koi_pond.png
    - Taken by Eduardo Torres Cruz via camera on iPhone 8 Plus
8. LuciousLightLogo.png
    - Created in Adobe Illustrator from scratch with it's built in text and geometric shape customizations

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.