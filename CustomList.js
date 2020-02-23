/**
 * Creates a custom list element to be inserted inside an ui element.
 * @param {*} container_id is the id for the ui element to insert the custom list. 
 */
function CustomList (container_id){

    /**
     * Default resources for module.
     */
    this.resources = {
      text: {
        h1: 'List of Elements',
      },
      images: {
        plusIcon: 'https://img.icons8.com/doodle/48/000000/add.png',
        trashIcon: 'https://img.icons8.com/wired/64/000000/filled-trash.png'
      }
    }

    /**
     * Private method
     * @param {*} text Of the card
     * @return A card element with text and a button to delete it
     */
    const createCard = (text) => {
        let buttonElement = $('<button class="list-item-btn"></button>').click(onClickDelete);
        let textElement = $('<span class="list-item-text"></span>').append(text);
        let element = $('<li class="list-item"></li>')
        .append(textElement)
        .append(buttonElement)
        .draggable({
            opacity: "0.5",
            revert: true,
            revertDuration: 1
        });
        return element;
    } 

    /**
     * Private method
     * Deletes an element from the element list only if the element that starts de click is a button.
     * @param {*} event produced by click
     */
    const onClickDelete = (event) => {
        // Deletes the element 
        event.target.tagName.toLowerCase() === "button" && $(event.target).parent().remove();
    }

    /**
     * Private Method
     * @param {*} event produced by click event.
     * Add's a new element inside the list.
     */
    const onAddElement = (event) => {
       
        let element = createCard(this.listCard.find('.te-input').val());
        // Add the element inside the list. 
        this.listCard.find(".list-items").append(element);
        // Reset the input value.
        this.listCard.find('.te-input').val(""); 
    }

    // CREATION 
    // ---------------------------------------------------------------------------------------
    // Get the element from ui given it's id.
    let container = $('#' + container_id);

    // Create our container as an attribute of the CustomList.
    this.listCard = $('<div></div>').addClass('list-card');
    // Create a header element
    let header = $('<header></header>')
                    .append($('<input></input>').addClass('te-input').attr('type', 'text'))
                    .append($('<button></button>').addClass('btn-add header-button').click(onAddElement)
                      .append($('<img/>').attr('src', this.resources.images.plusIcon)));

    // Create a Section element
    let section = $('<section></section>').addClass('list')
                    .append($('<h1></h1>').addClass('list-title').text(this.resources.text.h1))
                    .append($('<button></button>').addClass('btn-drop header-button')
                        .droppable({
                            drop: function(event, ui){
                                ui.draggable.remove();
                            },
                            hoverClass: "to-drop"
                        })
                      .append($('<img/>').attr('src', this.resources.images.trashIcon)));

    // Create an ul element. 
    let ul = $('<ul></ul>').addClass('list-items').click(onClickDelete);
    
    // Mounts the List element with header, section and ul
    this.listCard
      .append(header)
      .append(section)
      .append(ul);
   
    // Finally append this structure inside container_id element
    container.append(this.listCard);
    
    // Returns the container itself with all created.
    return container;
  }