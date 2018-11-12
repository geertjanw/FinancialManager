define(['ojs/ojcore', 'knockout', 'jquery',
     'text!data/sample1.json',
     'text!data/sample2.json',
     'demo-card/loader',
     'my-combobox-with-chart/loader'],
 function(oj, ko, $, file1, file2) {
  
    function DashboardViewModel() {
        
      var self = this;
      
      self.selectedLangInModule = ko.observable(oj.Config.getLocale());
      
      self.dashboardHeaderLabel = ko.observable(oj.Translations.getTranslatedString('department.dashboardHeader'));

      document.addEventListener("localeListener", function () {
          self.selectedLangInModule(oj.Config.getLocale());
          self.dashboardHeaderLabel(oj.Translations.getTranslatedString('department.dashboardHeader'));
      });  
        
      self.data1 = JSON.parse(file1);
      self.data2 = JSON.parse(file2);
      
      self.message = ko.observable();
      
      self.currentChart = ko.observable();
      
      self.chartTypeChangeWatcher = function(event) {
          self.currentChart(event.detail.value);
          console.log('type was: ' + event.detail.previousValue);
          console.log('type is now: ' + event.detail.value); 
          console.log('type updated from: ' + event.detail.updatedFrom); 
          console.log('--------------'); 
      };
      
      self.flipMickey = function() {
          document.getElementById("demo-card-2").flipCard();
      };
      
      // cardClick event listener:
      self.clickListener = function(event) {
          if (event.type === 'cardClick') {
              self.message('Clicked: ' + event.detail.value.name);
              console.log($(event.detail.value));
          }
      };
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
