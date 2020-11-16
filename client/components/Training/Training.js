import React from 'react';
import TrainingEvents from './TrainingEvents';

const Training = (props) => {
  return (
    <div>
      <div className="Title">Amateur Radio Classes & Testing</div>
      <div className="Content">
        <div>
          <p>
            WCRA has volunteer instructors that teach classes to prepare
            prospective hams for the Technician class license exam, and current
            hams for the General class license exam. Morse code is not required
            for any of the ham licenses. Licensing exams are offered throughout
            the year by the WCRA VE Team. Contact{' '}
            <a href="mailto:ve-testing@w9ccu.org">Tim Wheeler, KC9YFI</a> for
            more info.
          </p>
          <TrainingEvents />
        </div>
        <div>
          <h1>Additional Resources</h1>

          <p>
            Whether you are new to the hobby looking for new information, or a
            seasoned Ham looking for information on upgrading your license, our
            WCRA Training Team is committed to being as helpful as is possible.
            Please feel free to reach out and ask a question to our{' '}
            <a href="mailto:training@w9ccu.org">Training Coordinator</a>. We are
            proud to report that so many good questions have been asked, that we
            now have had enough create a useful{' '}
            <a href="Document/trainingreference.pdf">Training Reference</a>{' '}
            guide (PDF). It is our hope that you will find this helpful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Training;
