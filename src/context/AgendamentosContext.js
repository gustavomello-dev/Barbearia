import React, { createContext, useContext, useState } from 'react';

const AgendamentosContext = createContext();

export function AgendamentosProvider({ children }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [agendamentoEmAndamento, setAgendamentoEmAndamento] = useState(null);

  const adicionarAgendamento = (agendamento) => {
    const novo = {
      id: Date.now().toString(),
      ...agendamento,
    };
    setAgendamentos((prev) => [novo, ...prev]);
    setAgendamentoEmAndamento(null);
    return novo.id;
  };

  const cancelarAgendamento = (id) => {
    setAgendamentos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AgendamentosContext.Provider
      value={{
        agendamentos,
        agendamentoEmAndamento,
        setAgendamentoEmAndamento,
        adicionarAgendamento,
        cancelarAgendamento,
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}

export function useAgendamentos() {
  const context = useContext(AgendamentosContext);
  if (!context) {
    throw new Error('useAgendamentos deve ser usado dentro de AgendamentosProvider');
  }
  return context;
}
