import * as React from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { sizes } from "../../styles/variables";
import { Artboard } from "../../../artboard/artboard";
import { Instruments } from "../../../artboard/instruments-panel/types";
import {
  InstrumentsPanelAction,
  SetActiveInstrument
} from "../../model/instruments-panel/actions";
import { TopBar } from "../top-bar";
import { Artboard as ArtboardUI } from "../artboard";

const ARTBOARD_WIDTH = 940;
const ARTBOARD_HEIGHT = 500;

interface IAppProps {
  artboard: Artboard;
  setActiveInstrument: (instrument: Instruments) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<InstrumentsPanelAction>) => ({
  setActiveInstrument: (instrument: Instruments) => {
    dispatch(new SetActiveInstrument(instrument));
  }
});

const Layout = styled.div``;

const TopBarWrapper = styled.div``;

const ArtboardWrapper = styled.div`
  display: flex;
  height: calc(100vh - ${sizes.topBarHeight});
  justify-content: center;
  align-items: center;
`;

class AppComponent extends React.Component<IAppProps> {
  componentDidMount() {
    const { artboard, setActiveInstrument } = this.props;

    artboard.init();
    setActiveInstrument(Instruments.Select);
  }

  render() {
    return (
      <Layout>
        <TopBarWrapper>
          <TopBar />
        </TopBarWrapper>
        <ArtboardWrapper>
          <ArtboardUI width={ARTBOARD_WIDTH} height={ARTBOARD_HEIGHT} />
        </ArtboardWrapper>
      </Layout>
    );
  }
}

export const App = connect(
  null,
  mapDispatchToProps
)(AppComponent);
