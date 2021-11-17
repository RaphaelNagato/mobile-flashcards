import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "./Data";

const MOBILE_FLASH_CARDS_STORAGE_KEY = "MobileFlashCards:data";

export async function getDecks() {
  try {
    let decks;
    const result = await AsyncStorage.getItem(MOBILE_FLASH_CARDS_STORAGE_KEY);
    if (result) {
      decks = JSON.parse(result);
    } else {
      AsyncStorage.setItem(
        MOBILE_FLASH_CARDS_STORAGE_KEY,
        JSON.stringify(data)
      );
      decks = data;
    }
    return decks;
  } catch (err) {
    console.error(err);
  }
}

export function saveDeckTitle(title) {
  AsyncStorage.mergeItem(
    MOBILE_FLASH_CARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    })
  ).catch((err) => console.error(err));
}

export async function getDeck(id) {
  try {
    const result = await AsyncStorage.getItem(MOBILE_FLASH_CARDS_STORAGE_KEY);
    let deck = JSON.parse(result)[id];
    return deck;
  } catch (err) {
    console.error(err);
  }
}

export async function addCardToDeck(id, card) {
  let deck = await getDeck(id);

  AsyncStorage.mergeItem(
    MOBILE_FLASH_CARDS_STORAGE_KEY,
    JSON.stringify({
      [id]: {
        title: id,
        questions: [...deck.questions, card],
      },
    })
  );
}

export async function deleteDeck(id) {
  try {
    let decks = JSON.parse(
      await AsyncStorage.getItem(MOBILE_FLASH_CARDS_STORAGE_KEY)
    );
    delete decks[id];
    await AsyncStorage.setItem(
      MOBILE_FLASH_CARDS_STORAGE_KEY,
      JSON.stringify(decks)
    );
  } catch (error) {
    console.error(error);
  }
}
