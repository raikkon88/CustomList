/**
 * Creates a custom list element to be inserted inside an ui element.
 * @param {id for the ui element to insert the custom list.} container_id
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
      trashIcon: 'https://img.icons8.com/wired/64/000000/filled-trash.png',
      notFound: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSl-2bXlYLkJo9prLSIhOk15h3WFLCd30WE_UxFcncXmlIu_sbk'
    },
    ws: {
      apiKey: 'b0247a83',
      url: 'https://www.omdbapi.com/',
      param: 't'
    }
  }

  /**
   * Private method
   * @param {Card's text} text 
   * @return A card element with text and a button to delete it
   */
  const createCard = (title, year, genre, plot, image) => {
    let buttonElement = $('<button class="list-item-btn"></button>').click(onClickDelete);
    let imageElement = $('<img></img>').attr('src', image)
    let textsContainer = $('<div></div>').addClass('list-item-text-container')
      .append($('<span class="list-item-text"></span>').append(title))
      .append($('<span class="list-item-text"></span>').append(year))
      .append($('<span class="list-item-text"></span>').append(genre))
      .append($('<span class="list-item-text"></span>').append(plot))
    let infoElement = $('<div></div>').addClass('list-item-info')
      .append(imageElement)
      .append(textsContainer)
    let element = $('<li class="list-item"></li>')
      .append(infoElement)
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
   * @param {produced by click} event 
   */
  const onClickDelete = (event) => {
    // Deletes the element 
    event.target.tagName.toLowerCase() === "button" && $(event.target).parent().remove();
  }

  /**
   * Prints a new card inside the list.
   * @param {What is returned from ajax call} result 
   */
  const onResult = (result) => {

    if(result.Error){
      console.log("error ...");
    }
    else{
      let year = result.Year === "N/A" ? "" : result.Year;
      let genre = result.Genre === "N/A" ? "" : result.Genre;
      let plot = result.Plot === "N/A" ? "" : result.Plot;
      let poster = result.Poster === "N/A" ? this.resources.images.notFound : result.Poster;
  
      let card = createCard(
          result.Title, 
          year,
          genre, 
          plot, 
          poster)
      // Add the element inside the list. 
      this.listCard.find(".list-items").append(card);
    }
  }

  /**
   * Private Method
   * @param {produced by click} event
   * Add's a new element inside the list.
   */
  const search = (event) => {
    let queryText = this.listCard.find('.te-input').val();

    // En cas que es vulgui resetejar la llista per cada crida : 
    // this.listCard.find(".list-items").empty();
    
    $.ajax({
      url: this.resources.ws.url + "?" + this.resources.ws.param+"="+queryText+"&apiKey="+ this.resources.ws.apiKey,
      success: onResult,
    })
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
                  .append($('<button></button>').addClass('btn-add header-button').click(search)
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