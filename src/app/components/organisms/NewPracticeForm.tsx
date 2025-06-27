import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/app/components/atoms/Button';
import CountInput from '@/app/components/atoms/CountInput';
import Popover from '@/app/components/molecules/PopOver';
import { usePracticeContext } from '@/app/context/PracticeContext';
import ToggleSelect from '../atoms/ToggleSelect';

const NewPracticeForm: React.FC = () => {
  const { practiceSize, setPracticeSize, type, setType } = usePracticeContext();
  const [countOption, setCountOption] = useState<'AI' | 'manual'>('AI');
  const [showPopover, setShowPopover] = useState<'OX' | 'SHORT' | null>(null);
  const oxRef = useRef<HTMLDivElement>(null);
  const shortRef = useRef<HTMLDivElement>(null);
  const [oxPopoverPosition, setOXPopoverPosition] = useState<{
    top: string;
    left: string;
  }>({
    top: '0px',
    left: '0px',
  });
  const [shortPopoverPosition, setShortPopoverPosition] = useState<{
    top: string;
    left: string;
  }>({
    top: '0px',
    left: '0px',
  });

  useEffect(() => {
    if (oxRef.current) {
      const rect = oxRef.current.getBoundingClientRect();
      setOXPopoverPosition({
        top: `${rect.bottom + window.scrollY + 15}px`,
        left: `${rect.left + window.scrollX}`,
      });
    }
    if (shortRef.current) {
      const rect = shortRef.current.getBoundingClientRect();
      setShortPopoverPosition({
        top: `${rect.bottom + window.scrollY + 15}px`,
        left: `${rect.left + window.scrollX}`,
      });
    }
  }, [oxRef, shortRef]);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(event.target.value);
    if (isNaN(newSize) || newSize < 1) {
      toast.error('1 이상의 숫자를 입력해주세요.');
      setPracticeSize(0);
      return;
    }
    setPracticeSize(newSize);
  };

  const toggleType = (selectedType: 'OX' | 'SHORT') => {
    if (type === '') {
      setType(selectedType);
    } else if (type === 'OX' && selectedType === 'OX') {
      setType('');
    } else if (type === 'SHORT' && selectedType === 'SHORT') {
      setType('');
    } else if (type === 'OX' && selectedType === 'SHORT') {
      setType('BOTH');
    } else if (type === 'SHORT' && selectedType === 'OX') {
      setType('BOTH');
    } else if (type === 'BOTH' && selectedType === 'OX') {
      setType('SHORT');
    } else if (type === 'BOTH' && selectedType === 'SHORT') {
      setType('OX');
    }
  };

  return (
    <div className="flex flex-col justify-start h-full">
      <div className="flex flex-row gap-4 mb-8">
        <span className="text-white font-semibold flex flex-col justify-start items-start mt-2 whitespace-nowrap">
          문제 개수
        </span>
        <div className="flex flex-row">
          <ToggleSelect
            items={['AI 추천', '직접 입력']}
            onClick={(selectedItem) => {
              setCountOption(selectedItem === 'AI 추천' ? 'AI' : 'manual');
              if (selectedItem === 'AI 추천') {
                setPracticeSize(0);
              }
            }}
            isSelected={countOption === 'manual'}
          />

          {countOption === 'manual' && (
            <CountInput
              name="count"
              defaultValue={
                practiceSize !== null ? practiceSize.toString() : ''
              }
              onChange={handleCountChange}
              placeholder="문제 개수를 입력하세요"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-white font-semibold">문제 유형</span>
        <div className="flex flex-row gap-2">
          <div
            ref={oxRef}
            onMouseEnter={() => setShowPopover('OX')}
            onMouseLeave={() => setShowPopover(null)}
          >
            <Button
              label="OX 퀴즈"
              variant="select"
              isSelected={type === 'OX' || type === 'BOTH'}
              onClick={() => toggleType('OX')}
            />
            {showPopover === 'OX' && (
              <Popover type="OX" position={oxPopoverPosition} />
            )}
          </div>
          <div
            ref={shortRef}
            onMouseEnter={() => setShowPopover('SHORT')}
            onMouseLeave={() => setShowPopover(null)}
          >
            <Button
              label="단답형"
              variant="select"
              isSelected={type === 'SHORT' || type === 'BOTH'}
              onClick={() => toggleType('SHORT')}
            />
            {showPopover === 'SHORT' && (
              <Popover type="단답형" position={shortPopoverPosition} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPracticeForm;
