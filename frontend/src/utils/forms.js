import moment from 'moment';
export const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.internshipStartDate >= values.internshipFinishDate) {
    errors.internshipFinishDate =
      'The internship end date should be earlier than the start date';
  }
  if (values.startDate >= values.endDate) {
    errors.endDate = 'The internship end date should be earlier than the start date';
  }
  return errors;
};
export function checkMyDateWithinRange(
  internshipStartDate,
  internshipFinishDate
) {
  if (internshipFinishDate >= internshipStartDate) {
    const st = moment(internshipStartDate);
    const ed = moment(internshipFinishDate);
    const diffTime = Math.abs(ed - st);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTime + ' milliseconds');
    console.log(diffDays + ' days');
    return diffDays;
  } else {
    return 0;
  }
}
