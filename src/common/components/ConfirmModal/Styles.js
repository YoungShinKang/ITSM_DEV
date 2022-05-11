import styled from 'styled-components';

import { font } from 'common/utils/styles';
import Modal from 'common/components/Modal/Modal';
import Button from 'common/components/Button/Button';

export const StyledConfirmModal = styled(Modal)`
  padding: 35px 40px 40px;
`;

export const Title = styled.div`
  padding-bottom: 25px;
  ${font.medium}
  ${font.size(22)}
  line-height: 1.5;
`;

export const Message = styled.p`
  padding-bottom: 25px;
  white-space: pre-wrap;
  ${font.size(15)}
`;

export const Actions = styled.div`
  display: flex;
  padding-top: 6px;
`;

export const StyledButton = styled(Button)`
  margin-right: 10px;
`;
