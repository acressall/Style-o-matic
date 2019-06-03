  $(function() {
    // Question: is there any best practice for the _amount_ of variables you have?

    // Variables to hold the selected typefaces later
    var firstHeading = '';
    var secondHeading = '';
    var thirdHeading = '';
    var paragraphs = '';
    // Variables to hold the selected colours later
    var bgColour = '';
    var anyColour = '';
    var colourOne = '';
    var colourTwo = '';
    var colourThree = '';
    var colourFour = '';
    var colourFive = '';
    // All the typeface options
    var typefaces = {
      openSans: {
        name: 'Open Sans',
        type: 'sans-serif',
        styles: 10,
        className: 'open-sans',
        selection: null,
      },
      roboto: {
        name: 'Roboto',
        type: 'sans-serif',
        styles: 12,
        className: 'roboto',
        selection: null,
      },
      titillium: {
        name: 'Titillium',
        type: 'sans-serif',
        styles: 11,
        className: 'titillium',
        selection: null,
      },
      merriweather: {
        name: 'Merriweather',
        type: 'serif',
        styles: 8,
        className: 'merriweather',
        selection: null,
      },
      playfair: {
        name: 'Playfair',
        type: 'serif',
        styles: 6,
        className: 'playfair',
        selection: null,
      },
      spectral: {
        name: 'Spectral',
        type: 'serif',
        styles: 14,
        className: 'spectral',
        selection: null,
      },
      abril: {
        name: 'Abril FatFace',
        type: 'display',
        styles: 1,
        className: 'abril',
        selection: null,
      },
      lobster: {
        name:'Lobster',
        type: 'display',
        styles: 1,
        className: 'lobster',
        selection: null,
      },
      kaushan: {
        name: 'Kaushan',
        type: 'display',
        styles: 1,
        className: 'kaushan',
        selection: null,
      },
    }
    // All the colour options
    var colours = {
      reds: {
        dark: '#d3021c',
        medium: '#ea031f',
        light: '#f93a51',
      },
      oranges: {
        light: '#ff7b39',
        medium: '#fc5908',
        dark: '#f93a06',
      },
      yellows: {
        dark: '#fdb917',
        medium: '#ffcb05',
        light: '#ffdd00',
      },
      greens: {
        light: '#d0f44a',
        medium:'#a5d105',
        dark: '#90b204',
      },
      turquoise: {
        dark: '#0ec1c1',
        medium: '#17d3dd',
        light: '#38e6f9',
      },
      blues: {
        light: '#41d2f9',
        medium: '#0598e2',
        dark: '#057cce',
      },
      purples: {
        dark: '#6b1ad3',
        medium: '#8a2eed',
        light: '#b87af9',
      },
      pinks: {
        light: '#ea8fef',
        medium: '#e941f2',
        dark: '#cd05dd',
      },
    }

    // Selectors
    var headingOne = $('#first-heading');
    var headingTwo = $('#second-heading');
    var headingThree = $('#third-heading');
    var para = $('#paragraphs');
    var finalColour = $('#guide .colours');

    // Show typeface options within each type section
    for (var item in typefaces) {
      $('.typefaces').append(`<div class="typeface"><h2>${typefaces[item].name}</h2><p>${typefaces[item].styles}</p></div>`);
      // Add the className and type for each typeface
      $('.typeface').attr('class', typefaces[item].className).attr({
        'data-typeface': typefaces[item].className, 
        'data-typestyle': typefaces[item].type});
    }

    // When typeface selected, add .selected class, and remove it from the input
    $('.typefaces div').on('click', function() {
      var className = $(this).attr('class');
      $('.typefaces div').removeClass('selected');
      $(this).addClass('selected');
      // Remove all the class names from previous clicks
      // Add the typeface's className to the input
      $('input').removeAttr('class').addClass(className).removeClass('selected'); 
    });

    function findTypeface(type) {
      // Put the selected className in a variable
      var selectedType = $('#' + type + ' .selected').data('typeface');
      return selectedType;
    }

    function changeSelectionValue() {
      // Find the item in the array and change the selection value
      for (var item in typefaces) {
        if (typefaces[item].className === firstHeading) {
          typefaces[item].selection = 'first heading';
        } else if (typefaces[item].className === secondHeading) {
          typefaces[item].selection = 'second heading';
        } else if (typefaces[item].className === thirdHeading) {
          typefaces[item].selection = 'third heading';
        } else if (typefaces[item].className === paragraphs) {
          typefaces[item].selection = 'paragraphs';
        }
      }
    }

    function disableTypefaces() {
    // Check the type of typeface and disable clashing ones
      for (var item in typefaces) {
        var typeStyle = typefaces[item].type;  
        if (typeStyle === 'serif' && typefaces[item].selection === 'first heading' || typefaces[item].selection === 'second heading' || typefaces[item].selection === 'third heading') {
          headingTwo.find("[data-typestyle='" + 'display' + "']").addClass('disabled');
          headingThree.find("[data-typestyle='" + 'display' + "']").addClass('disabled');
        } else if (typeStyle === 'display' && typefaces[item].selection === 'first heading' || typefaces[item].selection === 'second heading' || typefaces[item].selection === 'third heading') {
          headingTwo.find("[data-typestyle='" + 'serif' + "']").addClass('disabled');
          headingThree.find("[data-typestyle='" + 'serif' + "']").addClass('disabled');
         } else if (typeStyle === 'display') {
          para.find("[data-typestyle='" + 'display' + "']").addClass('disabled');
        }
      }
    }


    // Switch to the next Type section when 'next section' button is clicked
    $('#first-heading .next-slide').on('click', function() {
      firstHeading = findTypeface('first-heading');
      changeSelectionValue();
      disableTypefaces();
      headingOne.removeClass('active-slide');
      headingTwo.addClass('active-slide');
    });
    $('#second-heading .next-slide').on('click', function() {
      secondHeading = findTypeface('second-heading');
      changeSelectionValue();
      disableTypefaces();
      headingTwo.removeClass('active-slide');
      headingThree.addClass('active-slide');
    });
    $('#third-heading .next-slide').on('click', function() {
      thirdHeading = findTypeface('third-heading');
      changeSelectionValue();
      disableTypefaces();
      headingThree.removeClass('active-slide');
      para.addClass('active-slide');
    });
    $('#paragraphs .next-slide').on('click', function() {
      paragraphs = findTypeface('paragraphs');
      changeSelectionValue();
      disableTypefaces();
    })
    
    // Display the colour options
    for (var item in colours) {
      var child = colours[item];
      for (var item in child) {
        $('.colour-options').append(`<div class="colour" style="background-color:${child[item]}"></div>`);
      }
    }

    function findColour(colour) {
      // Put the selected colour in a variable
      var selectedColour = $(colour).css('background-color');
      return selectedColour;
    }

    // Make a colour draggable
    $('.colour').draggable({
      cursor: 'move',
      snap: '.colour-choice',
      helper: 'clone',
      drag: function (event, ui) {
          $(this).addClass('dragging');
          bgColour = findColour(this);
      },
    });

    // Make it droppable
    $('.choice').droppable({
        over: function (event, ui) {
          bgColour = findColour();
          $(this).addClass('dragging');
        },
        out: function (event, ui) {
          $(this).removeClass('dragging');
        },
        drop: function (event, ui) {
          $('.colour').removeClass('dragging');
          $(this).removeClass('dragging').addClass('chosen').css('background', bgColour).attr('data-colour', bgColour);
        }
    });

    function selectedColour(choice) {
      // Store the selection in a vairable
      var chosenColour = $(choice).data('colour');
      return chosenColour;
    }

    // Make finished guide visible
    $('#finish').on('click', function() {
      $('#guide-wrapper').addClass('active-slide');
      // Add the typography class name in the guide
      $('#guide h1').addClass(firstHeading);
      $('#guide h2').addClass(secondHeading);
      $('#guide h3').addClass(thirdHeading);
      $('#guide p').addClass(paragraphs);
      // Add the colours, but only as many as are selected
      anyColour = selectedColour('.colour-choice div')
      colourOne =  selectedColour('#colour-1');
      colourTwo = selectedColour('#colour-2');
      colourThree = selectedColour('#colour-3');
      colourFour = selectedColour('#colour-4');
      colourFive = selectedColour('#colour-5')
      if (anyColour == colourOne || colourTwo || colourThree || colourFour || colourFive) {
        finalColour.append(`<div class="colour colour-one"></div>`)
        $('#guide .colour-one').css('background', colourOne);  
        finalColour.append(`<div class="colour colour-two"></div>`)
        $('#guide .colour-two').css('background', colourTwo); 
        finalColour.append(`<div class="colour colour-three"></div>`)
        $('#guide .colour-three').css('background', colourThree);  
        finalColour.append(`<div class="colour colour-four"></div>`)
        $('#guide .colour-four').css('background', colourFour); 
        finalColour.append(`<div class="colour colour-five"></div>`)
        $('#guide .colour-five').css('background', colourFive);    
      } 
    });
    
  });