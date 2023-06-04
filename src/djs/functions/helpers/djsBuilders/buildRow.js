// IMPORTS ...
const x = require("../../../../module.js");
const {
    ActionRowBuilder, log
  } = x
  async function createActionRow(actionRowObj) {
    try {
        const { components } = actionRowObj;

        // Check if components is defined and not empty
        if (!components || components.length === 0) {
          throw new Error("Components property is not defined or empty");
        }
      
        // Check if there are not more than 5 components in the actionRowObj
        if (components.length > 5) {
          throw new Error("Components property length is greater than 5");
        }
      
        // Check if all components are buttons or select menus
        for (const component of components) {
          if (component.type !== "BUTTON" && component.type !== "SELECT_MENU") {
            throw new Error("Component is not a button or selectMenu");
          }
      
          // If Select Menu is present, check if there is only one component
          if (component.type === "SELECT_MENU" && components.length > 1) {
            throw new Error("If Select Menu is present, Max Component Length is 1; Components property length is greater than 1");
          }
        }
      
        // Create the action row
        const newCustomActionRow = new ActionRowBuilder();
      
        // Add the components to the action row
        for (const component of components) {
          try {
            newCustomActionRow.addComponents(component);
          } catch (error) {
            log(
              "Error adding component [" + component.customID + "] to the Action Row",
              error
            );
          }
        }
      
        // Return the action row
        return newCustomActionRow;
} catch (error ) {
        log(`Error Creating Action Row`, error, actionRowObj)
        return null
    }
  }
  
  
  module.exports = { createActionRow };
  
  


  //   // Example Action Row Object that gets passed in below
  //   let actionRowObj = {
  //     components: [
  //     button_A,
  //     button_B, ... up to 5 in order from top to bottom
  //     ]
  //   }
  // OR
  //  let actionRowObj = {
    //     components: [
    //     selectMenu_A
    //     ]
    //   }

  
  
  /**
   * Creates a new actionRow using the provided action row object.
   * @param {Object} actionRowObj.components - An array of components to be added to the actionRow.
   */