register("Chat", (event) => {
  let abi = ChatLib.getChatMessage(event, true);
  if(abi.includes("&r&e✆ &r&5Igrupan&r&e ✆ &r") || abi.includes("&r&e✆ &r&5Pablo&r&e ✆ &r") ||abi.includes("&r&e✆ &r&cAranya&r&e ✆ &r") || abi.includes("&r&e✆ &r&dKaus&r&e ✆ &r") || abi.includes("&r&e✆ &r&5Rollim&r&e ✆ &r") || abi.includes("&r&a✆ Ring...") || abi.includes("&r&a✆ Ring... Ring...") || abi.includes("&r&a✆ Ring... Ring... Ring...r")) {
    cancel(event)
  }
});