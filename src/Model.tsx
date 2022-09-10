export interface ModelDescriptor {
  name: string;
  classes: string[];
  modelJson: string;
  metadataJson: string;
}

export const ASL_MODEL: Readonly<ModelDescriptor> = {
  name: "tm-my-image-model",
  classes: ["A", "B", "C", "D", "O", "R", "N"],
  modelJson: "https://storage.googleapis.com/tm-model/URTX1RHPl/model.json",
  metadataJson:
    "https://storage.googleapis.com/tm-model/URTX1RHPl/metadata.json",
};

export interface ModelAnswer {
  cellNumber: number;
  value: string;
  guess?: string;
}
