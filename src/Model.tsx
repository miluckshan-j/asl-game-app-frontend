export interface ModelDescriptor {
  name: string;
  classes: string[];
  modelJson: string;
  metadataJson: string;
}

export const ASL_MODEL: Readonly<ModelDescriptor> = {
  name: "tm-my-image-model",
  classes: ["A", "B", "C", "D", "E", "F", "G", "T", "R", "W"],
  modelJson: "https://teachablemachine.withgoogle.com/models/DqEEYxCih/model.json",
  metadataJson:"https://teachablemachine.withgoogle.com/models/DqEEYxCih/metadata.json",
};

export interface ModelAnswer {
  cellNumber: number;
  value: string;
  guess?: string;
}
