define(['knockout', 'ojs/ojknockout', 'ojs/ojavatar'],
  function (ko) {
    function model (context) {
        
      var self = this;
      self.initials = null;
      self.workFormatted = null;
      var flipContainer;
      var element = context.element;
      
      var formatPhoneNumber = function(number) {
        return Number(number).toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      };
      
      if (context.properties.name) {
        var initials = context.properties.name.match(/\b\w/g);
        self.initials = (initials.shift() + initials.pop()).toUpperCase();
      }
      
      if (context.properties.workNumber) {
        self.workFormatted = formatPhoneNumber(context.properties.workNumber);
      }
      
      self._flipCard = function() {
        $(element).children('.demo-card-flip-container').toggleClass('demo-card-flipped');
      };
     
      function clickCard(event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
          // Flip card:
          self._flipCard(); 
          // Fire a custom cardClick event, pass in the flip card name:
          var params = {
            'bubbles': true,
            'detail': {'value': element}
          };
          element.dispatchEvent(new CustomEvent('cardClick', params));
        }
      };

      function addListener() {
        flipContainer.addEventListener('click', clickCard);
        flipContainer.addEventListener('keypress', clickCard);
      };

      function removeListener() {
        flipContainer.removeEventListener('click', clickCard);
        flipContainer.removeEventListener('keypress', clickCard);
      };
      
      self.attached = function(context) {
        flipContainer = $(element).children('.demo-card-flip-container')[0];
        addListener();
      };
      
      self.disconnected = function(context) {
        removeListener();
      };
      
    }

    return model;
    
  }
          
);
