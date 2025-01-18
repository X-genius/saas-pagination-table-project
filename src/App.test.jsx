import { render, screen, waitFor } from "@testing-library/react";
import App, { fetchUsers } from "./App";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios");
beforeEach(() => {
  axios.get.mockReset();
});

describe("Test App.jsx file", () => {
  it("SaaS Table Pagination Message", () => {
    render(<App />);
    const message = screen.getByText(/SaaS Table Pagination Assignment/i);
    expect(message).toBeVisible();
  });

  it("should render user list after fetching list", async () => {
    const usersMock = [
      { "s.no": 0, "percentage.funded": 186, "amt.pledged": 2000 },
      { "s.no": 2, "percentage.funded": 82, "amt.pledged": 4000 },
    ];
    render(<App />);
    waitFor(async () => {
      axios.get.mockResolvedValue({
        data: usersMock,
      });
      const users = await fetchUsers();
      expect(axios.get).toHaveBeenCalledWith(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );
      expect(users).toStrictEqual(usersMock);
    });
  });
});
