import React, { FunctionComponent } from "react"
import { HeaderComponent } from "../../components/HeaderComponent"
import { Container } from "native-base"
import {
  SystemContent,
  SystemFlex,
  SystemSpace,
  SystemText
} from "../../system-components"
import {
  withNavigation,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation"
import { ScatterPlot } from "./ScatterPlot"
import { ScrollView } from "react-native"
import { REGULAR } from "../../system-components/system-theme/theme"
import { YieldDisplay } from "../../components/YieldDisplay"
import {
  compose,
  mapProps,
  withProps,
  lifecycle,
  branch,
  renderComponent
} from "recompose"
import { observable } from "mobx"
import { observer } from "mobx-react"
import {
  REACT_APP_SIMPLE_MODEL_REQUEST,
  REACT_APP_OPTIMIZE_SHADE_REQUEST
} from "react-native-dotenv"
import { LoadingScreen } from "../LoadingScreen/LoadingScreen"
import { handleUserShadeParameter } from "../../utils/handleShadeParameters"
import { handleUserSlopeParameter } from "../../utils/handleSlopeParameters"
import { IElementData } from "../../components/GGPlot/types"
import { GlobeIcon } from "../../assets/GlobeIcon/GlobeIcon"

export const ModelResultsScreen: FunctionComponent<{
  store: ResultsScreenStore
  navigation: NavigationScreenProp<NavigationRoute>
  response: IElementData[]
}> = ({ store, response }) => {
  const { focalPoint, handleIncrement, handleDecrement } = store
  console.log("respo in funcitonal", response)

  return (
    <Container>
      <HeaderComponent LeftIcon={GlobeIcon}>Model results</HeaderComponent>
      <SystemContent fill>
        <ScrollView>
          <SystemFlex align="center">
            <ScatterPlot focalPoint={focalPoint} response={response} />

            <YieldDisplay
              focalPoint={focalPoint}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />

            <SystemFlex row={true} noFlex>
              <SystemSpace size={REGULAR} />
              <SystemFlex>
                <SystemText>
                  During year {focalPoint.year} we expect that the coffee yeild
                  will be {focalPoint.yield} tones per hactar.
                </SystemText>
              </SystemFlex>

              <SystemSpace size={REGULAR} />
            </SystemFlex>
          </SystemFlex>
        </ScrollView>
      </SystemContent>
    </Container>
  )
}

class ResultsScreenStore {
  @observable
  public isLoading = true

  @observable
  focalPoint: { index: number; yield: number; year: number }

  @observable
  data: { yield: number; year: number }[]

  constructor({ response }: { response: { yield: number; year: number }[] }) {
    this.data = response
    this.focalPoint = { index: 4, ...response[4] }
  }

  handleLoadingTrue = () => {
    this.isLoading = true
  }

  handleLoadingFalse = () => {
    this.isLoading = false
  }

  handleIncrement = () => {
    if (this.focalPoint.index < 5) {
      this.focalPoint = {
        index: this.focalPoint.index + 1,
        ...this.data[this.focalPoint.index + 1]
      }
    }
  }

  handleDecrement = () => {
    if (this.focalPoint.index > 0) {
      this.focalPoint = {
        index: this.focalPoint.index - 1,
        ...this.data[this.focalPoint.index - 1]
      }
    }
  }
}

const power = compose<
  any,
  { navigation: NavigationScreenProp<NavigationRoute> }
>(
  withNavigation,
  withProps({
    isLoading: true
  }),
  lifecycle<any, { navigation: NavigationScreenProp<NavigationRoute> }, any>({
    async componentDidMount() {
      const {
        lng,
        lat,
        userShadeValue,
        userIrrValue,
        userSlopeValue
      } = this.props.navigation.getParam("point")

      const type = this.props.navigation.getParam("type")
      console.log("type", type)

      const handleSend = async () => {
        const data = {
          lng,
          lat,
          userShadeValue: handleUserShadeParameter(userShadeValue),
          userIrrValue: userIrrValue ? 1 : 0,
          userSlopeValue: handleUserSlopeParameter(userSlopeValue)
        }

        const getEndPoint = ({ type }: { type: string }) => {
          switch (type) {
            case "yield":
              return REACT_APP_SIMPLE_MODEL_REQUEST
            case "optimize":
              return REACT_APP_OPTIMIZE_SHADE_REQUEST
          }
        }

        const response = await fetch(getEndPoint({ type }), {
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          method: "POST"
        })

        return response.json()
      }

      const response = await handleSend()
      const res = response.map(el => {
        return {
          yield: el.yield,
          year: el.year - 1
        }
      })
      this.setState({ response: res, isLoading: false })
    }
  }),
  branch(
    ({ isLoading }: { isLoading: boolean }) => isLoading,
    renderComponent(LoadingScreen)
  ),
  mapProps(({ response, ...rest }: any) => ({
    store: new ResultsScreenStore({ response }),
    response,
    ...rest
  })),
  observer
)

export const PoweredModelResultsScreen = power(ModelResultsScreen)
