export interface ModelDescriptor {
  name: string;
  classes: string[];
  modelJson: string;
  metadataJson: string;
}

export const ASL_MODEL: Readonly<ModelDescriptor> = {
  name: "tm-my-image-model",
  classes: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "del",
    "nothing",
    "space",
  ],
  modelJson:
    "https://teachablemachine.withgoogle.com/models/KUlnb9rP4/model.json",
  metadataJson:
    "https://teachablemachine.withgoogle.com/models/KUlnb9rP4/metadata.json",
};
