import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from 'common/utils/browser';
import TextEditor from 'common/components/TextEditor/TextEditor';
import TextEditedContent from 'common/components/TextEditedContent/TextEditedContent';
import Button from 'common/components/Button/Button';

import { Title, EmptyLabel, Actions } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDescription = ({ issue }) => {
  const [description, setDescription] = useState(issue.CONTENT);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    setEditing(false);
    //이후의 동작은 보류. 필요 없을 가능성이 많다.
    //editable 상태와 uneditable 상태를 구분해서 동작을 넣어야 할 필요가 있을 것이고..
    //근본적으로 edit시 전달받은 data를 고치는 것이 필요 할 것 같다.
  };

  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  return (
    <Fragment>
      <Title>내용</Title>
      {isEditing ? (
        <Fragment>
          <TextEditor
            placeholder="서비스 요청 내용"
            defaultValue={description}
            onChange={setDescription}
          />
          <Actions>
            <Button variant="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="empty" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Actions>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <EmptyLabel onClick={() => setEditing(true)}>상세 요청사항을 입력하세요...</EmptyLabel>
          ) : (
            <TextEditedContent content={description} onClick={() => setEditing(true)} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
