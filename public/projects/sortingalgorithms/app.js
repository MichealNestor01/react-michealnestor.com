//This is the javascript for the sorting algorithms project
//I have tried for the most part to develop it using object oriented programing
//I used the chroma-js library to manage the colours of the color objects that are sorted

//the color class creates color objects which show up as coloured boxes on the screen which are the sorted into the corect order by the selected algorithm
class Color {
  constructor(div, index, color) {
    this.div = div;
    this.index = index;
    this.color = color;
    this.pivot = 0;
  }
  //update is used to change the color of and value of the color
  update(color, index) {
    this.color = color;
    this.index = index;
    this.div.style.backgroundColor = color;
  }
}

//screen opbjects represent the screen the user can see which is populated by
//color objects that the user can genereate and choose to sort
class ScreenObject {
  constructor() {
    this.items = [];
    this.isRunning = false;
    this.current = "bubble";
    this.pivotCount = 0;
  }

  //generate items populates the screen with color objects
  generateItems() {
    const itemCount = slider.value;
    let colors = this.generateColors(itemCount);
    while (screenDiv.firstChild) {
      screenDiv.removeChild(screenDiv.lastChild);
    }
    for (let i = 0; i < itemCount; i++) {
      let div = document.createElement("div");
      div.classList.add("item");
      div.style.backgroundColor = colors[i];
      this.items.push(new Color(div, i, colors[i]));
    }
  }

  //generate colors creates and returns a set amount of colour objects
  generateColors(itemCount) {
    let colors = [];
    let number = Math.round(360 / itemCount);
    //this loop splits the colour spectrum evenly and gives each
    //div a colour so that when in order, they resemble the colour spectrum
    for (let i = 0; i < itemCount; i++) {
      let color = chroma("#ff0000");
      colors.push(color.set("hsl.h", i * number));
    }
    return colors;
  }

  //shuffle items changes the order of all of the colour divs on teh screen
  shuffleItems() {
    this.items.sort(() => Math.random() - 0.5);
    this.items.forEach((item, index) => {
      item.div.style.order = index;
    });
  }

  //show items generates all of the color divs, shuffles them, and adds them to the screen div
  showItems() {
    this.generateItems();
    this.shuffleItems();
    this.items.forEach((item) => {
      screenDiv.appendChild(item.div);
    });
  }

  //load stats displays the statistics of the current sort, like pivot and comparison count
  loadStats(event) {
    switch (event.target.id) {
      case "bubble":
        quickStats.style.display = "none";
        bubbleStats.style.display = "flex";
        break;
      case "quick":
        quickStats.style.display = "flex";
        bubbleStats.style.display = "none";
        break;
    }
  }

  //buble sort is the first algorithm, it is an asnyc function so I could add pauses, creating an animation
  async bubbleSort() {
    //running is set to true, disabling the generate and solve buttons
    this.isRunning = true;
    //then the stats div's values are all reset
    let passes = 0;
    let totalComparisons = 0;
    let totalSwaps = 0;
    comaprisonsSpan.innerHTML = totalComparisons;
    swapsSpan.innerHTML = totalSwaps;
    passesSpan.innerHTML = passes;
    let solved = false;
    while (!solved) {
      //swaps is reset at the start of each pass
      let swaps = 0;
      //this for loop checks every div on the screen
      for (const [index, item] of this.items.entries()) {
        //as the algorithm checks a div against the one preceeding it,
        if (index > 0) {
          //the nature of a bubble sort is that the last item in the list is always sorted with a pass,
          //so this selection statement means I dont compare items which are already in the right place
          if (index < this.items.length - passes) {
            //the current item and the one before are compared and possibly swapped
            const result = this.compare(this.items[index - 1], item);
            //the stats are then updated and the items are givn the compare class, then program pauses to create the animation
            //before removing the class again, creating an animation
            totalComparisons++;
            comaprisonsSpan.innerHTML = totalComparisons;
            item.div.classList.add("compare");
            this.items[index - 1].div.classList.add("compare");
            await this.pause(1 / this.items.length);
            swaps += result;
            totalSwaps += result;
            swapsSpan.innerHTML = totalSwaps;
            item.div.classList.remove("compare");
            this.items[index - 1].div.classList.remove("compare");
          }
        }
      }
      //stats are updated after the pass
      passes += 1;
      passesSpan.innerHTML = passes;
      //if there has been a pass with no swaps then items are sorted
      if (swaps === 0) {
        solved = true;
      }
    }
    //the control buttons are rienabled
    this.isRunning = false;
  }

  //compare is used by the buble sort algorithm to comapre the values of two colour divs
  //and swap them if they are in the wrong order and return a 1 if a swap has occoured, else 0
  compare(color1, color2) {
    if (color1.index > color2.index) {
      this.swap(color1, color2);
      return 1;
    } else {
      return 0;
    }
  }

  //swap swaps the colours and indexes of two colour divs in the wrong order
  //unlike the quick sort the bubble sort just swaps the colours of the divs to give
  //the illusion of them being sorted, rather then changing the actual order of the divs,
  //the two algorithms were developed months apart and so at the point I was making the
  //buble sort I had not figured a way to swap the orders, so I did this instead which I am stil
  //very happy with
  swap(color1, color2) {
    let colorStore = color1.color;
    let indexStore = color1.index;
    color1.update(color2.color, color2.index);
    color2.update(colorStore, indexStore);
  }

  //quick sort animation prepares all the divs and variables for being quick sorted,
  //as the main quick sort algortihm is recursive this parent function was the easiest way
  //to manage stuff like the post quick sort animation.
  async quickSortAnimation() {
    //reset the quick sort stats
    this.pivotCount = 0;
    pivotsSpan.innerHTML = this.pivotCount;
    //add a transiton to each div
    this.items.forEach((item) => {
      item.div.style.transition = "all 0.2s ease";
    });
    //disable the control buttons
    this.isRunning = true;
    //the quick sort function is then called to sort the divs
    this.items = await this.quickSort(this.items, 0);
    //all of the divs are coloured and the pivot classes are removed from divs
    this.colorIn(this.items);
    await this.pause(0.4);
    this.clean();
    await this.pause(0.4);
    this.items.forEach((item) => {
      item.div.style.transition = "none";
    });
    //the items are sorted so the buttons are re-enabled
    this.isRunning = false;
  }

  async quickSort(list) {
    //quick sort greys out all values that are not in the current list,
    //this allows for a visualisation of the recusive nature of the algorithm
    //as only the items currently being sorted are coloured
    this.colorIn(list);
    //if the list is only 1 long then it is sorted so just return it
    if (list.length == 1) {
      return list;
    } else if (list.length == 2) {
      //if the list is two long then a simple comparison is made and they are
      //either swapped or returned on left in the current order and returned
      //also the second number in the list is made a pivot point
      let firstOrder = parseInt(list[0].div.style.order);
      let secondOrder = parseInt(list[1].div.style.order);
      if (list[0].index > list[1].index) {
        list[1].div.classList.add("pivot");
        this.pivotCount += 1;
        pivotsSpan.innerHTML = this.pivotCount;
        list[1].div.style.order = firstOrder;
        await this.pause(1);
        list[0].div.style.order = secondOrder;
        return [list[1], list[0]];
      } else {
        return list;
      }
    }
    //if the list is longer then two items then the list is split into two lists,
    //a lower list, filled with items with a value lower than that of the pivot
    //and a igher list, filled with items with a value higher than that of the pivot
    let lowerList = [];
    let higherList = [];
    //the pivot is at location (n+1)/2 in the list where n is the number of items in the list
    let pivot = list[Math.round((list.length - 1) / 2)];
    //the pivot stats are updated
    this.pivotCount += 1;
    pivotsSpan.innerHTML = this.pivotCount;
    pivot.pivot = 1;
    pivot.div.classList.add("pivot");
    //after the pivot has been selected there is a pause while the pivot div transitions
    await this.pause(1);
    list.forEach((item) => {
      if (item.index < pivot.index) {
        lowerList.push(item);
      } else if (item.index > pivot.index) {
        higherList.push(item);
      }
    });
    //as items are listed by flex-order I need to record the highest order in the current list,
    //as well as the lowest order in the current list.
    let lowerOrder = 100;
    let higherOrder = 0;
    //this loop redefines the lower order and higher order
    list.forEach((item) => {
      let order = parseInt(item.div.style.order);
      if (order < lowerOrder) {
        lowerOrder = order;
      } else if (order > higherOrder) {
        higherOrder = order;
      }
    });
    //higher index allows you to loop through the higher list in the same loop as the lower list
    let higherIndex = 0;
    let index = 0;
    //this loop sorts through all the items in the lift and pushes them physically
    //to the left or right of the pivot using the order of the divs
    for (let i = lowerOrder; i < higherOrder + 1; i++) {
      if (index < lowerList.length) {
        lowerList[index].div.style.order = i;
      } else if (index === lowerList.length) {
        pivot.div.style.order = i;
        await this.pause(1);
      } else {
        higherList[higherIndex].div.style.order = i;
        higherIndex++;
      }
      index++;
    }
    //here it is determined whether the higher and lower lists need to be sorted,
    //if they do they are ran through the quick sort algorithm themmselves, the sorted lower,
    //pivot and higher list are then concatenated and returned as one sorted list
    //the whole list is greyed out before a list is sent to be sorted, as the quick sort
    //fucntion will recolour the list that is being sorted.
    if (lowerList.length > 1 && higherList.length > 1) {
      await this.pause(0.4);
      this.greyOut(list);
      let lowerListSorted = await this.quickSort(lowerList);
      await this.pause(0.4);
      this.greyOut(list);
      let higherListSorted = await this.quickSort(higherList);
      return lowerListSorted.concat(pivot, higherListSorted);
    } else if (lowerList.length > 1) {
      await this.pause(0.4);
      this.greyOut(list);
      let lowerListSorted = await this.quickSort(lowerList);
      return lowerListSorted.concat(pivot, higherList);
    } else if (higherList.length > 1) {
      await this.pause(0.4);
      this.greyOut(list);
      let higherListSorted = await this.quickSort(higherList);
      return lowerList.concat(pivot, higherListSorted);
    } else {
      return lowerList.concat(pivot, higherList);
    }
  }

  //grey out list sets the background of each color object's div in the array it is given to grey
  greyOut(list) {
    list.forEach((item) => {
      if (
        String(item.color.rgb()) ===
        String(chroma(item.div.style.backgroundColor).rgb())
      ) {
        item.div.style.backgroundColor = chroma(
          item.div.style.backgroundColor
        ).darken(2);
      }
    });
  }

  //color in sets the background of each object given's div to the objects colour attribute
  colorIn(list) {
    list.forEach((item) => {
      item.div.style.backgroundColor = item.color;
    });
  }

  //clean removes the pivot class from all of the objects its given's divs
  clean() {
    this.items.forEach((item) => {
      if (item.div.classList.contains("pivot")) {
        item.div.classList.remove("pivot");
      }
    });
  }

  //pause is used to mayuse a given amount of seconds, this only works when used with
  //async functions
  pause(time) {
    return new Promise((resolve) => setTimeout(resolve, time * 1000));
  }
}

//query selectors for document elements
//I could have made these screen attributes however I personally
//like keeping them separate global variables that I can access through all functions/classes
const slider = document.querySelector(".item-counter");
const playButton = document.querySelector(".play-button");
const generateButton = document.querySelector(".generate-button");
const screenDiv = document.querySelector(".screen");
const algorithmSelect = document.querySelectorAll(".custom-option");
const algorithmSelectBox = document.querySelector(".custom-select");
const bubbleStats = document.querySelector(".bubble-stats");
const quickStats = document.querySelector(".quick-stats");
const comaprisonsSpan = document.querySelector("#comparisons");
const swapsSpan = document.querySelector("#swaps");
const passesSpan = document.querySelector("#passes");
const pivotsSpan = document.querySelector("#pivots");
let screen = new ScreenObject();
bubbleStats.style.display = "flex";

//event listeners
generateButton.addEventListener("click", () => {
  if (!screen.isRunning) {
    screen.items = [];
    screen.showItems();
  } else {
    alert("Please wait for the current sort to finish");
  }
});

playButton.addEventListener("click", () => {
  if (!screen.isRunning) {
    let algorithm = "none";
    algorithmSelect.forEach((option) => {
      if (option.classList.contains("selected")) {
        algorithm = option.id;
      }
    });
    if (algorithm === "bubble") {
      screen.bubbleSort();
    } else {
      screen.quickSortAnimation();
    }
  } else {
    alert("Please wait for the current sort to finish");
  }
});

algorithmSelectBox.addEventListener("click", screen.loadStats);

//The following two widgets I coded for previous projects and I am just repurposing them here:

//Select Box Code:
//this checks if the box is clicked if it is, then it is added the class open. which makes the options visible
//prettier-ignore
document.querySelector(".custom-select-wrapper").addEventListener("click", function () {
  this.querySelector(".custom-select").classList.toggle("open");
});

//this loop checks if any of the options have been selected, and acts acordingly, it also highlights the currently selected object
for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      //prettier-ignore
      this.parentNode.querySelector(".custom-option.selected").classList.remove("selected");
      this.classList.add("selected");
      screen.items = [];
      screen.showItems();
      //prettier-ignore
      this.closest(".custom-select").querySelector(".custom-select-trigger span").textContent = this.textContent;
    }
  });
}

//this function just makes sure if the user clicks anywhere else on the screen that the select box is closed.
window.addEventListener("click", function (event) {
  const select = document.querySelector(".custom-select");
  if (!select.contains(event.target)) {
    select.classList.remove("open");
  }
});

//slider code:
let itemCount;

//Select slider and button from your html:
const itemSlider = document.querySelector(".item-counter");

//this fucntion updates the text and the slider
function changeItems(event) {
  const itemNumber = document.querySelector(".item-number");
  if (!itemSlider.classList.contains("inactive")) {
    itemCount = event.target.value;
    itemNumber.innerText = itemCount;
  } else {
    event.target.value = itemCount;
  }
}

//add event listeners to the button and the range slider
itemSlider.addEventListener("input", function (event) {
  changeItems(event);
});
