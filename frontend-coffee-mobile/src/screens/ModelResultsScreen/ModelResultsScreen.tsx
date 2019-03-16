import React, { FunctionComponent } from "react"
import { HeaderComponent } from "../../components/HeaderComponent"
import { Container } from "native-base"
import {
  SystemContent,
  SystemFlex,
  SystemSpace,
  SystemText
} from "../../system-components"
import { ScatterPlot } from "./ScatterPlot"
import { ScrollView } from "react-native"
import { REGULAR } from "../../system-components/system-theme/theme"
import { YieldDisplay } from "../../components/YieldDisplay"
import { compose, mapProps } from "recompose"
import { observable } from "mobx"
import { observer } from "mobx-react"
import {
  withNavigation,
  NavigationScreenProps,
  NavigationRoute
} from "react-navigation"

export const response = [
  { year: 0, yield: 0 },
  { year: 1, yield: 0 },
  { year: 2, yield: 0 },
  { year: 3, yield: 1.14 },
  { year: 4, yield: 4.14 },
  { year: 5, yield: 4.14 }
]

export const ModelResultsScreen: FunctionComponent<{
  store: ResultsScreenStore
  navigation: NavigationScreenProps<NavigationRoute>
}> = ({ store, navigation }) => {
  console.log("navigatin", navigation.getParam("point"))

  const { focalPoint, handleIncrement, handleDecrement } = store
  return (
    <Container>
      <HeaderComponent>Model results</HeaderComponent>
      <SystemContent fill>
        <ScrollView>
          <SystemFlex align="center">
            {/* <SystemSpace size={SMALL} />
            <SubHeader> Field </SubHeader>
            <SystemSpace size={SMALL} /> */}
            <ScatterPlot focalPoint={focalPoint} />

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
  focalPoint: { index: number; yield: number; year: number }

  @observable
  data: { yield: number; year: number }[]

  constructor({ response }: { response: { yield: number; year: number }[] }) {
    this.data = response
    this.focalPoint = { index: 4, ...response[4] }
    console.log("this.focalPoint")
  }

  handleIncrement = () => {
    console.log("hello", this.focalPoint.index)
    if (this.focalPoint.index < 5) {
      this.focalPoint = {
        index: this.focalPoint.index + 1,
        ...this.data[this.focalPoint.index + 1]
      }
    }
  }

  handleDecrement = () => {
    console.log("hello this is decrement", this.focalPoint.index)
    if (this.focalPoint.index > 0) {
      this.focalPoint = {
        index: this.focalPoint.index - 1,
        ...this.data[this.focalPoint.index - 1]
      }
    }
  }
}

const power = compose<any, any>(
  mapProps(({ rest }: any) => {
    return {
      store: new ResultsScreenStore({ response }),
      ...rest
    }
  }),
  withNavigation,
  observer
)

export const PoweredModelResultsScreen = power(ModelResultsScreen)
