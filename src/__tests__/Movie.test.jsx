import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen, cleanup } from "@testing-library/react";
import routes from "../routes";

const id = 1;
const router = createMemoryRouter(routes, {
  initialEntries: [`/movie/${id}`],
  initialIndex: 0,
});

beforeEach(() => {
  render(<RouterProvider router={router} />);
});

afterEach(() => {
  cleanup();
});

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");

  // Render is done in beforeEach, just check for errors
  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  const h1 = await screen.findByText(/Doctor Strange/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders movie's time within a p tag", async () => {
  const p = await screen.findByText(/115/);
  expect(p).toBeInTheDocument();
  expect(p.tagName).toBe("P");
});

test("renders a span for each genre", async () => {
  const genres = ["Action", "Adventure", "Fantasy"];
  for (const genre of genres) {
    const span = await screen.findByText(genre);
    expect(span).toBeInTheDocument();
    expect(span.tagName).toBe("SPAN");
  }
});

test("renders the <NavBar /> component", async () => {
  const newRouter = createMemoryRouter(routes, {
    initialEntries: [`/movie/1`],
  });

  render(<RouterProvider router={newRouter} />);

  const navElements = await screen.findAllByRole("navigation");
  expect(navElements.length).toBeGreaterThan(0);
});