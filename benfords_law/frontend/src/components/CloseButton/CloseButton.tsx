import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled, { css } from "styled-components";

const Button = styled.button(
  ({ theme }) => css`
    background: transparent;
    color: ${theme.color.primaryLight};
    font-size: 3rem;
    width: fit-content;
    border: none;
    cursor: pointer;
    appearance: none;
    padding: 0;

    &:hover {
      color: ${theme.color.secondaryLight}
    }
  `
);

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button aria-label="Close" onClick={onClick}>
      <span aria-hidden="true">✕</span>
    </Button>
  );
}
