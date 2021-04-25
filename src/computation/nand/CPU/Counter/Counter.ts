/**
 * A 16-bit counter with load and reset control bits.
 * if      (reset[t] == 1) out[t+1] = 0
 * else if (load[t] == 1)  out[t+1] = in[t]
 * else if (inc[t] == 1)   out[t+1] = out[t] + 1  (integer addition)
 * else                    out[t+1] = out[t]
 */

import Inc16 from "../../Arithmetic/Inc16";
import BinaryBus from "../../BinaryBus";
import BusFork from "../../BinaryBus";
import Chip from "../../Chip";
import { Clock } from "../../Clocked";
import Register from "../../Memory/Register";
import { PIN_INPUT, PIN_LOAD, PIN_OUTPUT } from "../../types";

class Counter extends Chip {
  incrementer: Inc16;
  register: Register;
  busFork: BusFork;

  constructor(clock: Clock) {
    super("Counter");

    this.incrementer = new Inc16();
    this.register = new Register(clock);
    this.busFork = new BinaryBus().connect(this.incrementer.getBus(PIN_INPUT));

    // Internal Wiring
    this.incrementer
      .getBus(PIN_OUTPUT)
      .connect(this.register.getBus(PIN_INPUT));
    this.register.getBus(PIN_OUTPUT).connect(this.busFork);

    // External Wiring
    // this.createBus(PIN_INPUT, this.incrementer.getBus(PIN_INPUT));
    this.createBus(PIN_OUTPUT, this.register.getBus(PIN_OUTPUT));

    // Initial State
    // this.register.sendToBus(PIN_INPUT, ZERO_WORD);
    this.register.getPin(PIN_LOAD).send(true);
    // this.incrementer.sendToBus(PIN_INPUT, ZERO_WORD);
  }
}

export default Counter;
