// IMPORTS ...
const x = require("../../../../module.js");
const {
    ActionRowBuilder, log
  } = x
  async function buildRow(actionRowObj) {
  // Check if the actionRowObj is defined
  if (!isDefined(actionRowObj)) {
    log("Action row object is not defined", actionRowObj);
    return null;
  }

  // Check if the components property is defined and is an array
  const components = actionRowObj.components;
  if (!components || components.length === 0) {
    log("Components property is not defined or is empty", components);
    return null;
  }

  // Check if there are not more than 5 components in the actionRowObj
  if (components.length > 5) {
    log("Components property length is greater than 5", components);
    return null;
  }

  // Check if all components are buttons or select menus
  for (const component of components) {
    switch (component.type) {
      case "BUTTON":
      case "SELECT_MENU":
        break;
      default:
        log("Component is not a button or selectMenu", component);
        return null;
    }

    // If Select Menu is present, check if there is only one component
    if (component.type === "SELECT_MENU" && components.length > 1) {
      log("If Select Menu is present, Max Component Length is 1; Components property length is greater than 1", components);
      return null;
    }
  }

  // Create the action row
  const newCustomActionRow = new ActionRowBuilder();

  // Add the components to the action row
  for (const component of components) {
    try {
      newCustomActionRow.addComponents(component);
    } catch (error) {
      log("Error adding component [" + component.customID + "] to the Action Row", error);
      return null;
    }
  }

  // Return the action row
  return newCustomActionRow;
}
  
  
  module.exports = { buildRow };
  
  


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