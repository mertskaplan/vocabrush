import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/useGameStore';
import { useShallow } from 'zustand/react/shallow';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslations';
import { CheckCircle, Hourglass, Trophy } from 'lucide-react';
export const TurnSummaryScreen: React.FC = () => {
  const {
    teams,
    currentTeamIndex,
    wordsGuessedThisTurn,
    unseenWords,
    proceedToNextTurn,
    turnEndReason,
  } = useGameStore(
    useShallow((state) => ({
      teams: state.teams,
      currentTeamIndex: state.currentTeamIndex,
      wordsGuessedThisTurn: state.wordsGuessedThisTurn,
      unseenWords: state.unseenWords,
      proceedToNextTurn: state.proceedToNextTurn,
      turnEndReason: state.turnEndReason,
    }))
  );
  const { t } = useTranslations();
  const currentTeam = teams[currentTeamIndex];
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-xl w-full max-w-md"
    >
      <h1 className="text-4xl font-extrabold text-slate-800 font-display">
        {turnEndReason === 'words-exhausted'
          ? t('game.turnSummary.wordsExhaustedTitle')
          : t('game.turnSummary.subtitle')}
      </h1>
      <p className="text-xl text-slate-500 mt-2">
        {t('game.turnSummary.title', { teamName: currentTeam.name })}
      </p>
      <div className="grid grid-cols-2 gap-4 w-full my-8">
        <div className="flex flex-col items-center p-4 bg-green-100 rounded-2xl">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <span className="text-4xl font-extrabold text-green-700 mt-2">
            {wordsGuessedThisTurn.length}
          </span>
          <span className="text-sm font-semibold text-green-800">{t('game.turnSummary.guessedThisTurn')}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-sky-100 rounded-2xl">
          <Hourglass className="w-8 h-8 text-sky-600" />
          <span className="text-4xl font-extrabold text-sky-700 mt-2">
            {unseenWords.length}
          </span>
          <span className="text-sm font-semibold text-sky-800">{t('game.turnSummary.wordsLeft')}</span>
        </div>
      </div>
      <div className="w-full space-y-3">
        <h3 className="text-xl font-bold text-slate-700">{t('scoreboard.scoresTitle')}</h3>
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-3 rounded-xl text-white"
            style={{ backgroundColor: team.color }}
          >
            <div className="flex items-center gap-3">
              {index === 0 ? <Trophy className="w-5 h-5 text-amber-300" /> : <span className="font-bold w-5 text-center">{index + 1}.</span>}
              <span className="font-bold text-lg">{team.name}</span>
            </div>
            <span className="text-2xl font-extrabold font-display">{team.score}</span>
          </div>
        ))}
      </div>
      <Button
        onClick={proceedToNextTurn}
        className="mt-8 h-16 w-full text-xl font-bold bg-sky-500 hover:bg-sky-600 rounded-2xl shadow-lg"
      >
        {t('game.turnSummary.continue')}
      </Button>
    </motion.div>
  );
};