import BinaryPin from "./BinaryPin";
import BinaryBus from "./BinaryBus";

class Chip {
  name: string;
  inputs: string[];
  outputs: string[];
  pins: {
    [name: string]: BinaryPin;
  };
  buses: {
    [name: string]: BinaryBus;
  };

  constructor(name: string, inputs: string[], outputs: string[]) {
    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
    this.pins = {};
    this.buses = {};
  }

  createPin(name: string, ...pins: BinaryPin[]) {
    if (name in this.pins)
      throw new Error(`Pin already exists on ${this.name}: ${name}`);

    // Single output
    if (pins.length === 1) {
      this.pins[name] = pins[0];
      return;
    }

    // Multiple Outputs, create a splitter
    if (pins.length > 1) {
      this.pins[name] = new BinaryPin().connectRecipient(...pins);
      return;
    }
  }

  createBus(name: string, bus: BinaryBus) {
    if (name in this.buses)
      throw new Error(`Pin already exists on ${this.name}: ${name}`);

    this.buses[name] = bus;
  }

  getBus(name: string): BinaryBus {
    if (!(name in this.buses))
      throw new Error(`Output Bus ${name} doesn't exist on ${this.name}`);
    return this.buses[name];
  }

  getPin(name: string): BinaryPin {
    return this.pins[name];
  }
}

export default Chip;
