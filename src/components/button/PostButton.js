import React from "react";
import styled from "styled-components";

const Button = styled.button `
  width: ${props => props.width ?? '126'}px;
  height: ${props => props.height ?? '48'}px;
  border-radius: 4px;
  background-color: ${props => props.backgroundColor ?? '#BAA2FF'};
  font-size: 20px;
  color: ${props => props.color ?? 'white'};
  border: ${props => props.borderColor === undefined ? 'none' : `1px solid ${props.borderColor}`};
`

function PostButton({content, backgroundColor, color, width, height, borderColor, onClick}) {

  return (
    <Button
      onClick={onClick}
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {content}
    </Button>
  )
}

export default PostButton;