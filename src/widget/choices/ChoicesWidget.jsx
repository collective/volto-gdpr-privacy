import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Grid, Menu, Button, Icon } from 'semantic-ui-react';
import { TextWidget, ArrayWidget } from '@plone/volto/components';
import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';
import ChoiceTextWidget from './ChoiceTextWidget';
import ReferenceUrlsWidget from './ReferenceUrlsWidget';
import SingleChoiceWidget from './SingleChoiceWidget';

const messages = defineMessages({
  cookies_choices: {
    id: 'gdprcookiesettings-cookies_choices',
    defaultMessage: 'Cookies',
  },
  config_key: {
    id: 'gdprcookiesettings-choice_config_key',
    defaultMessage: 'Key',
  },
  text: {
    id: 'gdprcookiesettings-choice_text',
    defaultMessage: 'Text',
  },
  referenceUrls: {
    id: 'gdprcookiesettings-choice_referenceUrls',
    defaultMessage: 'Reference URLs',
  },
  moveItemUp: {
    id: 'gdprcookiesettings-choice-move-up',
    defaultMessage: 'Move choice up',
  },
  moveItemDown: {
    id: 'gdprcookiesettings-choice-move-down',
    defaultMessage: 'Move choice down',
  },
  addChoice: {
    id: 'gdprcookiesettings-choice-add',
    defaultMessage: 'Add choice',
  },
  deleteChoice: {
    id: 'gdprcookiesettings-choice-delete',
    defaultMessage: 'Delete choice',
  },
});

const DEFAULT_CHOICE = { config_key: '', referenceUrls: [], text: {} };
const srOnlyStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};

const ChoicesWidget = ({
  value = [DEFAULT_CHOICE],
  id,
  title,
  onChange,
  type,
}) => {
  //type: [technical, profiling]
  const intl = useIntl();
  const [activeChoice, setActiveChoice] = useState(0);

  const moveChoice = (e, choiceIndex, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let newValue = [...value];

    let choice = value[choiceIndex];
    newValue.splice(choiceIndex, 1);
    newValue.splice(choiceIndex + (up ? -1 : 1), 0, choice);

    onChange(id, newValue);
  };

  const addChoice = (e) => {
    e.preventDefault();
    let new_value = [...value];
    new_value.push(DEFAULT_CHOICE);

    setActiveChoice(value.length);
    onChange(id, new_value);
  };

  const deleteChoice = (e, index) => {
    e.preventDefault();
    let new_value = [...value];
    new_value.splice(index, 1);

    if (activeChoice === index) {
      let new_index = index > 0 ? index - 1 : 0;
      if (new_value.length == 0) {
        new_value = [DEFAULT_CHOICE];
      }
      setTimeout(() => setActiveChoice(new_index), 0);
    }

    onChange(id, new_value);
  };

  return (
    <div className="choices-widget">
      <h4>{intl.formatMessage(messages.cookies_choices)}</h4>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular className="choices-items-menu">
            {value?.map((choice, idx) => (
              <Menu.Item
                key={`choices-item-${idx}`}
                name={choice.config_key}
                active={activeChoice === idx}
                onClick={() => setActiveChoice(idx)}
              >
                <Button.Group vertical className="move-buttons">
                  <Button
                    disabled={idx === 0}
                    size="tiny"
                    icon={<Icon name="arrow up" />}
                    title={intl.formatMessage(messages.moveItemUp)}
                    onClick={(e) => moveChoice(e, idx, 'up')}
                  />
                  <Button
                    disabled={idx === value.length - 1}
                    size="tiny"
                    icon={<Icon name="arrow down" />}
                    title={intl.formatMessage(messages.moveItemDown)}
                    onClick={(e) => moveChoice(e, idx, 'down')}
                  />
                </Button.Group>
                <span>{choice.config_key ?? '?KEY?'}</span>
              </Menu.Item>
            ))}
            <Menu.Item
              name={intl.formatMessage(messages.addChoice)}
              onClick={(e) => addChoice(e, activeChoice)}
            >
              <Icon name="plus" />
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={8}>
          {activeChoice > -1 && activeChoice < value?.length ? (
            <>
              <SingleChoiceWidget
                value={value[activeChoice]}
                type={type}
                onChange={(v) => {
                  let new_value = [...value];
                  new_value[activeChoice] = v;
                  onChange(id, new_value);
                }}
              />
              <br />
              <Button
                onClick={(e) => deleteChoice(e, activeChoice)}
                negative
                icon="trash"
                content={intl.formatMessage(messages.deleteChoice)}
              />
            </>
          ) : (
            <></>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ChoicesWidget;
