import {Dimensions, ScrollView} from 'react-native';
import * as React from 'react';
import {Button} from 'react-native-paper';
import {COLORS, LAYOUT} from '../../styles/theme';

import ProgressComponent from '../../components/ProgressComponent';
import ThemeButton from '../../components/ThemeButton';
import {addHabit, deleteHabit} from '../../DBFunctions';
import {LineChart} from 'react-native-chart-kit';
import {DataTable, Dialog, Paragraph} from 'react-native-paper';
import PaddedDivider from '../../components/PaddedDivider';

export default function DetailsScreen({navigation, route}) {
  //obtaining data from route send from index screen
  const {habit} = route.params;
  let data = [0, 0, 0, 0, 0, 0];
  let counter = 0;
  const currentMonth = new Date().getMonth() + 1;
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  habit.graphData.map((element) => {
    data[counter] = element;
    counter = counter + 1;
  });

  if (currentMonth <= 2) {
    data[0] = habit.points;
  }
  if (currentMonth > 2 && currentMonth <= 4) {
    data[1] = habit.points;
  }
  if (currentMonth > 4 && currentMonth <= 6) {
    data[2] = habit.points;
  }
  if (currentMonth > 6 && currentMonth <= 8) {
    data[3] = habit.points;
  }
  if (currentMonth > 8 && currentMonth <= 10) {
    data[4] = habit.points;
  }
  if (currentMonth > 10 && currentMonth <= 12) {
    data[5] = habit.points;
  }

  addHabit(
    habit.habitId,
    habit.habitDesc,
    habit.startDate,
    habit.numPerD,
    habit.category,
    habit.consPts,
    habit.points,
    habit.date,
    data,
  );

  return (
    <ScrollView style={LAYOUT.main}>
      <LineChart
        data={{
          labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get('window').width - 24}
        height={180}
        yAxisLabel=""
        yAxisSuffix="pts"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: COLORS.primaryLight,
          backgroundGradientFrom: COLORS.primaryLight,
          backgroundGradientTo: COLORS.primaryLight,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '3',
            stroke: COLORS.primaryDark,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>Points</DataTable.Cell>
          <DataTable.Cell numeric>{habit.points}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Consecutive Points</DataTable.Cell>
          <DataTable.Cell numeric>{habit.consPts}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Start date</DataTable.Cell>
          <DataTable.Cell numeric>
            {new Date(habit.startDate).toLocaleString()}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Frequency</DataTable.Cell>
          <DataTable.Cell numeric>{habit.numPerD}</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Category</DataTable.Cell>
          <DataTable.Cell numeric>{habit.category}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Description</DataTable.Cell>
          <DataTable.Cell numeric>{habit.habitDesc}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <PaddedDivider />
      <ProgressComponent habit={habit} />

      <ThemeButton
        accessibilityLabel="Edit this habit."
        text="EDIT"
        type="secondary"
        onPressEvent={() => {
          navigation.navigate('Tasks', {
            screen: 'EditHabit',
            params: {
              habit: habit,
            },
          });
        }}
      />

      <ThemeButton
        accessibilityLabel="Delete this habit."
        text="DELETE"
        type="muted"
        onPressEvent={() => {
          setVisible(true);
        }}
      />
      <PaddedDivider />

      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>
            Do you want to permanently delete the habit {habit.habitId}?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button
            onPress={() => {
              deleteHabit(habit.habitId);
              navigation.navigate('Tasks', {
                screen: 'Index',
              });
            }}>
            DELETE
          </Button>
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
}
