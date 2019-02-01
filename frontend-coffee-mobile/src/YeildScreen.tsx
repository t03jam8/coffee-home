import React, { FunctionComponent } from "react"
import {
  Container,
  Header,
  Footer,
  Content,
  Title,
  Body,
  Button
} from "native-base"
import { Text } from "react-native"
import { WELCOME_SCREEN } from "./utils/constants"
import { withNavigation } from "react-navigation"

export const YieldScreen: FunctionComponent = withNavigation(
  ({ navigation }: any) => {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Yeild</Title>
          </Body>
        </Header>
        <Content>
          <Button
            rounded
            large
            onPress={() => navigation.navigate(WELCOME_SCREEN)}
          >
            <Text>Calculate Yeild</Text>
          </Button>
        </Content>
        <Footer />
      </Container>
    )
  }
)