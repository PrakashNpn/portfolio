"use client";

import { Component, type ReactNode } from "react";

type Props = { fallback: ReactNode; children: ReactNode };
type State = { hasError: boolean };

/**
 * Catches errors from a 3D scene (WebGL context loss, failed texture/model,
 * unsupported GPU) and renders a static fallback instead of crashing the
 * whole section.
 */
export class CanvasBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D canvas error — falling back to static view:", error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
