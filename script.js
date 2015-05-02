//Static vars.
var totalMoney = 0.00;
var totalPlayedTime = 0;
var totalBuildings = 0;
var totalUpgrades = 0;
var totalClicks = 0;
var totalMPS = 0;
var firstGame = true;

//Other vars.
var MoneyForThisRound = 000000;
var MoneyPerSecondForThisRound = 0;
var clicksForThisRound = 0;
var buildingsForThisRound = 0;
var upgradesForThisRound = 0;
var playedTime = 0;

var CHEESE_COST = 100;
var MOUSE_TRAP_COST = 500;
var TRASH_CAN_COST = 3000;
var POISON_COST = 10000;
var MACHINE_GUN_COST = 40000;
var TANK_COST = 200000;
var NUKE_COST = 1818181;

var CHEESE_MPS = 0.5;
var MOUSE_TRAP_MPS = 4;
var TRASH_CAN_MPS = 10;
var POISON_MPS = 40;
var MACHINE_GUN_MPS = 100;
var TANK_MPS = 400;
var NUKE_MPS = 8181;

//a bootstrap tooltip function
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/* Objects
*  Including: buildings, upgrades
*
*/

//Constructor for buildings object
var buildings = function (cost, mps,baseMPS,baseCost) {
    this.cost = cost;
    this.mps = mps;
    this.baseMPS = baseMPS;
    this.baseCost = baseCost;
    this.totalBought = 0;
    this.totalMPS = 0;
    
    this.addOneToTotalBought = function () {
        this.totalBought += 1;
        buildingsForThisRound += 1;
        totalBuildings += 1;
    };
    
    this.addMPS = function () {
        this.mps += this.baseMPS;
        this.totalMPS += this.mps;
    };
    
    this.baseMPSToMPS = function () {
        this.totalMPS += this.mps;
        MoneyPerSecondForThisRound += this.baseMPS;
    };
    
    this.addCost = function () {
        this.cost = (this.baseCost * Math.pow(1.15,this.totalBought));
    };
    
    this.subtractTotalCost = function () {
        MoneyForThisRound -= this.cost;
    };
    
    this.addNewMPS = function (times) {
        //first we subtract the pervious added MPS
        MoneyPerSecondForThisRound -= this.totalMPS;
        console.log(this.totalMPS);
        //then we make the new baseMPS
        this.baseMPS = this.baseMPS * times;
        this.totalMPS = this.totalMPS * times;
        console.log(this.totalMPS);
        
        MoneyPerSecondForThisRound += this.totalMPS;
        
        
    }
       
};



/*
*   All the building objects
*/
//cheese
var cheese = new buildings(CHEESE_COST, CHEESE_MPS);
var cheeseCost = $('.buy-room').find('.cheese-cost');
    cheeseCost.text(cheese.cost);
var cheeseMPS = $('.buy-room').find('.cheese-second');
    cheeseMPS.text(cheese.mps);
var cheeseBought = $('.buy-room').find('.cheese-number');
    cheeseBought.text(cheese.totalBought);

//mouse Trap
var mouseTrap = new buildings(MOUSE_TRAP_COST, MOUSE_TRAP_MPS);
var mouseTrapCost = $('.buy-room').find('.mouse-trap-cost');
    mouseTrapCost.text(mouseTrap.cost);
var mouseTrapMPS = $('.buy-room').find('.mouse-trap-second');
    mouseTrapMPS.text(mouseTrap.mps);
var mouseTrapBought = $('.buy-room').find('.mouse-trap-number');
    mouseTrapBought.text(mouseTrap.totalBought);

//trash can
var trashCan = new buildings(TRASH_CAN_COST, TRASH_CAN_MPS);
var trashCanCost = $('.buy-room').find('.trash-can-cost');
    trashCanCost.text(trashCan.cost);
var trashCanMPS = $('.buy-room').find('.trash-can-second');
    trashCanMPS.text(trashCan.mps);
var trashCanBought = $('.buy-room').find('.trash-can-number');
    trashCanBought.text(trashCan.totalBought);

//Poison
var poison = new buildings(POISON_COST, POISON_MPS);
var poisonCost = $('.buy-room').find('.poison-cost');
    poisonCost.text(poison.cost);
var poisonMPS = $('.buy-room').find('.poison-second');
    poisonMPS.text(poison.mps);
var posionBought = $('.buy-room').find('.poison-number');
    posionBought.text(poison.totalBought);

//machine gun
var machineGun = new buildings(MACHINE_GUN_COST, MACHINE_GUN_MPS);
var machineGunCost = $('.buy-room').find('.machine-gun-cost');
    machineGunCost.text(machineGun.cost);
var machineGunMPS = $('.buy-room').find('.machine-gun-second');
    machineGunMPS.text(machineGun.mps);
var machineGunBought = $('.buy-room').find('.machine-gun-number');
    machineGunBought.text(machineGun.totalBought);

//Tank
var tank = new buildings(TANK_COST, TANK_MPS);
var tankCost = $('.buy-room').find('.tank-cost');
    tankCost.text(tank.cost);
var tankMPS = $('.buy-room').find('.tank-second');
    tankMPS.text(tank.mps);
var tankBought = $('.buy-room').find('.tank-number');
    tankBought.text(tank.totalBought);

//Nuke
var nuke = new buildings(NUKE_COST, NUKE_MPS);
var nukeCost = $('.buy-room').find('.nuke-cost');
    nukeCost.text(nuke.cost);
var nukeMPS = $('.buy-room').find('.nuke-second');
    nukeMPS.text(nuke.mps);
var nukeBought = $('.buy-room').find('.nuke-number');
    nukeBought.text(nuke.totalBought);


/*
*   All the functions
*
*/
        
        
//display renewed money and MPS when called
function displayMoney(){
    var money = $('.infor').find('.money');
        money.text(MoneyForThisRound.toFixed(2));
    var moneySec = $('.infor').find('.money-sec');
        moneySec.text(MoneyPerSecondForThisRound);
    
    //show values on statistics page
    var getCurBuilding = $('.current').find('.current-building');
        getCurBuilding.text(buildingsForThisRound);
    var getCurUpgrade = $('.current').find('.current-upgrade');
        getCurUpgrade.text(upgradesForThisRound);
    var getCurClick = $('.current').find('.current-click');
        getCurClick.text(clicksForThisRound);
    $('.cumulative').find('.cumulative-click').text(totalClicks);
    $('.cumulative').find('.cumulative-gold').text(totalMoney.toFixed(2));
    $('.cumulative').find('.cumulative-play-time').text(totalPlayedTime);
    $('.cumulative').find('.cumulative-upgrade').text(totalUpgrades);
    $('.cumulative').find('.cumulative-building').text(totalBuildings);
    $('.cumulative').find('.cumulative-mps').text(totalMPS);
    
}

//every 5 clicks will move the cat logo one time
function clickControl() {
    $('.cat-click').click(function() {
         
        totalMoney += 1;
        MoneyForThisRound += 1;
        displayMoney();
        totalClicks += 1; //keep track on how many times has user clicked 
        clicksForThisRound += 1; //keep track on how many times has user clicked 
        
            $('.cat-click').effect('bounce', {times: 1}, 50);
        
    });
}

//Used to add money to totalMoney and MoneyForThisRound in every one second
function totalAutoMoneyPerSecond() {
    MoneyForThisRound += MoneyPerSecondForThisRound / 10; //add money per sec to money for this round
    totalMoney += MoneyPerSecondForThisRound / 10;
    if(totalMPS < MoneyPerSecondForThisRound){
        totalMPS = MoneyPerSecondForThisRound;
    }
    displayMoney(); 
}

//check if the button can hover
function checkHoverButt(buttonID,objectName,money,showSecond,minReq,times){
    $(buttonID).hover(function() {
                if (MoneyForThisRound >= money && objectName.totalBought >= minReq){ //check if money is enough to buy
                    $(this).addClass('butt-hover');
                }
            }, 
            function () {
                $(this).removeClass('butt-hover');   
            }
        );
    
     $(buttonID).click( function () {
             if (MoneyForThisRound >= money && objectName.totalBought >=  minReq){
                objectName.addNewMPS(times);
                showSecond.text(objectName.baseMPS);
                $(buttonID).tooltip('hide')
                $(buttonID).remove();
                 totalUpgrades += 1;
                 upgradesForThisRound += 1;
             }
        });
}

//check if the building can hover
function checkHoverBuilding (buildingID,money) {
    $(buildingID).hover(function() {
                if (MoneyForThisRound >= money){ //check if money is enough to buy
                    $(this).addClass('active');
                }
            }, 
            function(){
                $(this).removeClass('active');   
            }
        );
}

/*function checkOnBuilding (className,objectName) {
    if(MoneyForThisRound >= objectName.cost ){
        $(className).addClass('active');
    }
    else{
        $(className).removeClass('active');
    }
}*/

//A function that will handle action when user buys a building
function clickBuyListAction (className, objectName, cost, mps, showNumber, showCost, showSecond) {
    
    //This will call the checkhover function to check if the user has money to buy this building
    checkHoverBuilding(className,objectName.cost);
    

    //Handle click functions
     $(className).click(function () {
               if (MoneyForThisRound >= objectName.cost){  //check if money is enough to buy
                   
                   if(objectName.totalBought === 0){
                       objectName.baseCost = cost;
                       objectName.baseMPS = mps;
                   }
                   objectName.addOneToTotalBought();  //increment 1 to total bought
                   objectName.subtractTotalCost();
                   objectName.addCost();
                   objectName.baseMPSToMPS();
                   
                   displayMoney();
                   
                   /*if(objectName.totalBought > 0){
                        objectName.addMPS();     //increment mps
                   }*/
                   
                   showNumber.text(objectName.totalBought);
                   showCost.text(Math.round(objectName.cost));
                   showSecond.text(objectName.baseMPS);
                   
                   if (MoneyForThisRound < objectName.cost){ //check if money is enough to buy
                    $(this).removeClass('active');
                }      
            }
        });
}

function checkTime () {
    totalPlayedTime += 1;
    playedTime += 1;
}

/*
*
*
*   Buy list
*
*/
function addBuyList() {
    // mouse trap
     
        clickBuyListAction('#mouse-trap',mouseTrap,MOUSE_TRAP_COST,MOUSE_TRAP_MPS,mouseTrapBought,mouseTrapCost,mouseTrapMPS);

    /////////////////////////////////////////////////////////////////////////////
    //cheese
    
         clickBuyListAction('#cheese',cheese,CHEESE_COST,CHEESE_MPS,cheeseBought,cheeseCost,cheeseMPS);
        
    /////////////////////////////////////////////////////////////////////////////
     //Trash Can
    
        clickBuyListAction('#trash-can',trashCan,TRASH_CAN_COST,TRASH_CAN_MPS,trashCanBought,trashCanCost,trashCanMPS);
    
    
    /////////////////////////////////////////////////////////////////////////////
     //Poison
        
        clickBuyListAction('#poison',poison,POISON_COST,POISON_MPS,posionBought,poisonCost,poisonMPS);
    
    /////////////////////////////////////////////////////////////////////////////
    
    //Machine Gun
    
        clickBuyListAction('#machine-gun',machineGun,MACHINE_GUN_COST,MACHINE_GUN_MPS,machineGunBought,machineGunCost,machineGunMPS);
    
    /////////////////////////////////////////////////////////////////////////////
    
    //Tank
    
        clickBuyListAction('#tank',tank,TANK_COST,TANK_MPS,tankBought,tankCost,tankMPS);
   
    /////////////////////////////////////////////////////////////////////////////
    
    //Nuke Bomb
    
        clickBuyListAction('#nuke',nuke,NUKE_COST,NUKE_MPS,nukeBought,nukeCost,nukeMPS);
    
}

function addShowList() {
    checkHoverButt('#cheese-2',cheese,10000,cheeseMPS,1,2);
    checkHoverButt('#mouse-trap-2',mouseTrap,50000,mouseTrapMPS,1,2);
    checkHoverButt('#trash-can-2',trashCan,300000,trashCanMPS,1,2);
    checkHoverButt('#poison-2',poison,1000000,poisonMPS,1,2);
    checkHoverButt('#machine-gun-2',machineGun,4000000,machineGunMPS,1,2);
    checkHoverButt('#tank-2',tank,20000000,tankMPS,1,2);
    checkHoverButt('#nuke-2',nuke,818181818,nukeMPS,1,2);
    
    checkHoverButt('#cheese-2-2',cheese,100000,cheeseMPS,10,2);
    checkHoverButt('#mouse-trap-2-2',mouseTrap,500000,mouseTrapMPS,10,2);
    checkHoverButt('#trash-can-2-2',trashCan,3000000,trashCanMPS,10,2);
    checkHoverButt('#poison-2-2',poison,10000000,poisonMPS,10,2);
    checkHoverButt('#machine-gun-2-2',machineGun,40000000,machineGunMPS,10,2);
    checkHoverButt('#tank-2-2',tank,200000000,tankMPS,10,2);
    checkHoverButt('#nuke-2-2',nuke,1818181818,nukeMPS,10,2);

    checkHoverButt('#cheese-2-3',cheese,500000,cheeseMPS,50,2);
    checkHoverButt('#mouse-trap-2-3',mouseTrap,2500000,mouseTrapMPS,50,2);
    checkHoverButt('#trash-can-2-3',trashCan,15000000,trashCanMPS,50,2);
    checkHoverButt('#poison-2-3',poison,50000000,poisonMPS,50,2);
    checkHoverButt('#machine-gun-2-3',machineGun,200000000,machineGunMPS,50,2);
    checkHoverButt('#tank-2-3',tank,1000000000,tankMPS,50,2);
    checkHoverButt('#nuke-2-3',nuke,9090909090,nukeMPS,50,2);
    
    checkHoverButt('#cheese-2-4',cheese,10000000,cheeseMPS,100,2);
    checkHoverButt('#mouse-trap-2-4',mouseTrap,500000000,mouseTrapMPS,100,2);
    checkHoverButt('#trash-can-2-4',trashCan,3000000000,trashCanMPS,100,2);
    checkHoverButt('#poison-2-4',poison,10000000000,poisonMPS,100,2);
    checkHoverButt('#machine-gun-2-4',machineGun,40000000000,machineGunMPS,100,2);
    checkHoverButt('#tank-2-4',tank,200000000000,tankMPS,100,2);
    checkHoverButt('#nuke-2-4',nuke,1818181818181,nukeMPS,100,2);
}

//a function to check if local storage is supported
function supportsLocalStorage() {
    if(typeof(Storage) !== "undefined") {
        return true;
    } 
    else {
    //No Web Storage support
    return false;
    }
}

function saveGameState() {
    if (!supportsLocalStorage()) { 
        return false; 
    }
    localStorage["catclick.firstgame"] = false ;
    localStorage["catclick.totalmoney"] = totalMoney;
    localStorage["catclick.totalbuildings"] = totalBuildings;
    localStorage["catclick.totalupgrades"] = totalUpgrades;
    localStorage["catclick.moneyforthisround"] = MoneyForThisRound;
    localStorage["catclick.moneypersecondforthisround"] = MoneyPerSecondForThisRound;
    localStorage["catclick.clickforthisround"] = clicksForThisRound ;
    localStorage["catclick.buildingsforthisround"] = buildingsForThisRound; 
    localStorage["catclick.upgradesforthisround"] = upgradesForThisRound;
    
    console.log("saved");
    return true;
}

function resumeGame() {
    if (!supportsLocalStorage()) { 
        return false; 
    }
    console.log("game is resumed");
    totalMoney = parseFloat(localStorage["catclick.totalmoney"]);
    totalBuildings = parseInt(localStorage["catclick.totalbuildings"]);
    totalUpgrades = parseInt(localStorage["catclick.totalupgrades"]);
    MoneyForThisRound = parseInt(localStorage["catclick.moneyforthisround"]);
    MoneyPerSecondForThisRound = parseInt(localStorage["catclick.moneypersecondforthisround"]);
    clicksForThisRound = parseInt(localStorage["catclick.clickforthisround"]);
    buildingsForThisRound = parseInt(localStorage["catclick.buildingsforthisround"]);
    upgradesForThisRound = parseInt(localStorage["catclick.upgradesforthisround"]);

    return true;
}

//check if this is the first time playing this game
function isFirstGame() {
    if (!supportsLocalStorage()) {
        return false;
    }
    if(localStorage["catclick.firstgame"] === "false"){
        console.log("This is not first game");
        firstGame = false;
        return false;
    }
    else {
        console.log("This is first game");
        return true;
    }
}

function saveButton() {
    $('.save-button').click( function() {
        saveGameState();
    });
}

//clear everything
function deleteDataButton() {
    $('.delete-data').click( function() {
        localStorage.clear();
         totalMoney = 0.00;
        totalPlayedTime = 0;
         totalBuildings = 0;
         totalUpgrades = 0;
         totalClicks = 0;
         totalMPS = 0;
         firstGame = true;

        //Other vars. 
        MoneyForThisRound = 000000;
         MoneyPerSecondForThisRound = 0;
         clicksForThisRound = 0;
         buildingsForThisRound = 0;
         upgradesForThisRound = 0;
         playedTime = 0;
    });
}


function init() {
    clickControl();
    addBuyList();
    addShowList();
    setInterval(function () {totalAutoMoneyPerSecond()}, 100);
    setInterval(function () {checkTime()}, 60000); //this is used to record total played time

    if(isFirstGame()) {
        setInterval(function() {saveGameState()}, 10000); //the game will save automaticlly every 10 secs
    }
    else {
        resumeGame();
        setInterval(function() {saveGameState()}, 10000); //the game will save automaticlly every 10 secs
    }
    
    saveButton();
    deleteDataButton()
}

$(document).ready(init());