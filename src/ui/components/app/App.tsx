import * as React from "react";
import throttle from "lodash/throttle";
import styled from "styled-components";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { sizes, colors } from "../../styles/variables";
import { Artboard } from "../../../artboard/artboard";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { AppAction } from "../../actions";
import { SetActiveInstrument } from "../../model/instruments-panel/actions";
import {
  SetArtboardtWidth,
  SetArtboardHeight
} from "../../model/artboard/actions";
import { TopBar } from "../top-bar";
import { Artboard as ArtboardUI } from "../artboard";
import { Sidebar } from "../sidebar";

interface IAppProps {
  artboard: Artboard;
  setActiveInstrument: (instrument: Instruments) => void;
  setArtboardtWidth: (width: number) => void;
  setArtboardHeight: (height: number) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
  setActiveInstrument: (instrument: Instruments) => {
    dispatch(new SetActiveInstrument(instrument));
  },
  setArtboardtWidth: (width: number) => {
    dispatch(new SetArtboardtWidth(width));
  },
  setArtboardHeight: (height: number) => {
    dispatch(new SetArtboardHeight(height));
  }
});

const AppStyled = styled.div`
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: ${colors.foreground};
`;

const Layout = styled.div``;

const MainArea = styled.div`
  position: relative;
  display: flex;
`;

class AppComponent extends React.Component<IAppProps> {
  public throttledResize!: () => void;

  constructor(props: IAppProps) {
    super(props);

    this.throttledResize = throttle(this.handleResizeWindow, 100);
    window.addEventListener("resize", this.throttledResize);
  }

  componentDidMount() {
    const { artboard, setActiveInstrument } = this.props;

    artboard.init();
    this.updateArtboardSize();
    setActiveInstrument(Instruments.Select);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.throttledResize);
  }

  updateArtboardSize() {
    const { setArtboardtWidth, setArtboardHeight } = this.props;

    const width = window.innerWidth - sizes.sidebarWidth;
    const height = window.innerHeight - sizes.topBarHeight;

    setArtboardtWidth(width);
    setArtboardHeight(height);
  }

  handleResizeWindow = () => {
    this.updateArtboardSize();
  };

  render() {
    return (
      <AppStyled>
        <Layout>
          <TopBar />
          <MainArea>
            <ArtboardUI />
            <Sidebar />
          </MainArea>
        </Layout>
      </AppStyled>
    );
  }
}

export const App = connect(
  null,
  mapDispatchToProps
)(AppComponent);
