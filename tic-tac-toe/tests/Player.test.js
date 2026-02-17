import { describe, it, expect } from "vitest";
import Player from "../src/Player.js";

describe("Player Factory", () => {
  it("should create a player with a name and symbol", () => {
    const player = Player("Alice", "X");
    expect(player.getName()).toBe("Alice");
    expect(player.getSymbol()).toBe("X");
  });

  it("should allow creating multiple unique players", () => {
    const player1 = Player("Alice", "X");
    const player2 = Player("Bob", "O");
    expect(player1.getName()).toBe("Alice");
    expect(player2.getName()).toBe("Bob");
  });

  it("should throw an error if the symbol is not X or O", () => {
    expect(() => Player("Alice", "Z")).toThrow("Invalid symbol");
  });

  it("should throw an error if the name is empty", () => {
    expect(() => Player("", "X")).toThrow("Name cannot be empty");
  });
});
