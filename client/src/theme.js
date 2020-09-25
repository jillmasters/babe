import styled from '@emotion/styled';

const colors = {
  pink: '#e63946',
  white: '#f1faee',
  pale: '#a8dadc',
  mid: '#457b9d',
  dark: '#1d3557',
};

const MainView = styled('section')`
  height: 65vh;
  width: 100%;
  flex: 2 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  border: solid ${colors.white} thick;
  border-top: none;
  padding: 10% 0;
  border-radius: 0 0 50px 50px;
  background: ${colors.mid};
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
`;

const FormLabel = styled('label')`
  padding: 1em;
  font-size: 3vw;
  line-height: 1.4;
  color: ${colors.white};
`;

const FormInput = styled('input')`
  border: none;
  border-radius: 50px;
  padding: 0.25em;
  background: ${colors.white};
  color: ${colors.dark};
  font-family: 'Poppins';
  font-size: 3vw;
  text-indent: 10px;
`;

const FormRadio = styled('input')`
  width: 2vw;
  height: 2vw;
  appearance: none;
  display: inline-block;
  padding: 0.25em;
  border: 2px solid ${colors.white};
  border-radius: 50%;
  background-color: ${colors.white};
  transform: scale(3);

  :checked {
    background-color: ${colors.dark};
  }
`;

const FormButton = styled('button')`
  width: 100%;
  font-family: 'Poppins';
  font-size: 3vw;
  line-height: 1;
  color: ${colors.white};
`;

const FormSection = styled('div')`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const FormSlider = styled('input')`
  width: 100%;
  appearance: none;
  border-radius: 50px;
  height: 25px;
  background: ${colors.white};
  outline: none;

  ::-webkit-slider-thumb {
    appearance: none;
    height: 40px;
    width: 16px;
    border-radius: 5px;
    background: ${colors.dark};
    cursor: pointer;
  }
`;

export {
  colors,
  MainView,
  FormLabel,
  FormInput,
  FormRadio,
  FormButton,
  FormSection,
  FormSlider,
};
