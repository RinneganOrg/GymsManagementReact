import React from "react";
import {
  Modal,
  Header,
  List,
  Image,
  Label,
  Icon,
  Grid,
} from "semantic-ui-react";
import moment from "moment";

const  ModalActivity =(selectedActivity, open, setOpen, courses, trainers) => {
  const getCourse = (activity) => {
    return courses.find((element) => element._id === activity.courseId);
  };
  const getTrainer = (course) => {
    return trainers.find((element) => element._id === course.trainerId);
  };

  if (selectedActivity !== null) {
    return (
      <div>
        <Modal
          size="tiny"
          onClose={() => setOpen(false)}
          open={open}
        >
          <Modal.Header>
            <Grid>
              <Grid.Column width={8}>
                <Header as="h2">
                  <Label
                    circular
                    size="mini"
                    className="course-label"
                    style={{
                      backgroundColor: `${getCourse(selectedActivity).color}`,
                    }}
                  />
                  {getCourse(selectedActivity).name}
                </Header>
              </Grid.Column>
            </Grid>
          </Modal.Header>
          <Modal.Content>
            <div>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={1}>
                    <Icon
                      name="calendar alternate outline"
                      color="grey"
                      size="large"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    {new Date(selectedActivity.startDate).getMonth() ===
                    new Date(selectedActivity.endDate).getMonth() ? (
                      <h3>
                        {moment(selectedActivity.startDate).format("D")}
                        {`  `}-{`  `}
                        {moment(selectedActivity.endDate).format("D")}
                        {`  `}
                        {moment(selectedActivity.startDate).format("MMMM")}
                        {`  `}
                        {new Date(selectedActivity.startDate).getFullYear()}
                      </h3>
                    ) : (
                      <h3>
                        {moment(selectedActivity.startDate).format("D MMMM")}
                        {`  `}-{`  `}
                        {moment(selectedActivity.endDate).format("D MMMM")}
                        {`  `}
                        {new Date(selectedActivity.startDate).getFullYear()}
                      </h3>
                    )}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column width={1}>
                    <Icon name="id badge outline" color="grey" size="large" />
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3">Trainers</Header>
                    <List horizontal>
                      <List.Item>
                        <Image
                          avatar
                          src={
                            getTrainer(getCourse(selectedActivity)).trainerImage
                          }
                        />
                        <List.Content>
                          <List.Header>
                            {
                              getTrainer(getCourse(selectedActivity))
                                .trainerName
                            }
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={1}>
                    <Icon
                      name={
                        selectedActivity.maxAttendance ===
                          selectedActivity.currentAttendance ||
                        new Date(selectedActivity.endDate) < new Date()
                          ? "minus circle"
                          : "check circle outline"
                      }
                      color={
                        selectedActivity.maxAttendance ===
                          selectedActivity.currentAttendance ||
                        new Date(selectedActivity.endDate) < new Date()
                          ? "red"
                          : "green"
                      }
                      size="large"
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <h3>
                      {" "}
                      Attenance: {selectedActivity.currentAttendance} /{" "}
                      {selectedActivity.maxAttendance}
                    </h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={1}>
                    <Icon
                      name="money bill alternate"
                      color="green"
                      size="large"
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <h3>
                      {" "}
                      Price: {getCourse(selectedActivity).price}$ / participant
                    </h3>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    );
  } else return <></>;
}
export default ModalActivity;
