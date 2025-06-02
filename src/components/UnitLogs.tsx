'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnitLog {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  classification: 'classified' | 'unclassified' | 'top-secret';
}

interface UnitLogsProps {
  fileId: string;
}

export const UnitLogs: React.FC<UnitLogsProps> = ({ fileId }) => {
  const [logs, setLogs] = useState<UnitLog[]>([]);
  const [newLog, setNewLog] = useState('');
  const [classification, setClassification] = useState<UnitLog['classification']>('unclassified');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de logs do backend
    setTimeout(() => {
      setLogs([
        {
          id: '1',
          author: 'Brigadeiro Lethbridge-Stewart',
          content: 'Arquivo identificado. Mantendo sob vigilância.',
          timestamp: Date.now() - 86400000,
          classification: 'classified'
        },
        {
          id: '2',
          author: 'Dr. Martha Jones',
          content: 'Análise preliminar concluída. Conteúdo seguro para visualização.',
          timestamp: Date.now() - 3600000,
          classification: 'unclassified'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [fileId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.trim()) return;

    const log: UnitLog = {
      id: Date.now().toString(),
      author: 'Agente UNIT',
      content: newLog,
      timestamp: Date.now(),
      classification
    };

    setLogs(prev => [log, ...prev]);
    setNewLog('');
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-green-500 font-mono text-xl">UNIT LOGS</h2>
        <div className="flex items-center space-x-2">
          <span className="text-green-500 font-mono text-sm">STATUS:</span>
          <span className="text-green-500 font-mono animate-pulse">ATIVO</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <select
            value={classification}
            onChange={(e) => setClassification(e.target.value as UnitLog['classification'])}
            className="bg-gray-800 text-green-500 font-mono border border-green-500 rounded px-2 py-1"
          >
            <option value="unclassified">NÃO CLASSIFICADO</option>
            <option value="classified">CLASSIFICADO</option>
            <option value="top-secret">ULTRA SECRETO</option>
          </select>
          <input
            type="text"
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
            placeholder="Digite seu relatório..."
            className="flex-1 bg-gray-800 text-green-500 font-mono border border-green-500 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 text-black font-mono px-4 py-1 rounded hover:bg-green-400"
          >
            ENVIAR
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {isLoading ? (
            <div className="text-green-500 font-mono text-center">
              Carregando registros da UNIT...
            </div>
          ) : (
            logs.map(log => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-green-500 rounded p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-green-500 font-mono">{log.author}</span>
                    <span className="text-gray-500 font-mono text-sm ml-2">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <span className={`font-mono text-xs px-2 py-1 rounded ${
                    log.classification === 'classified' ? 'bg-yellow-500 text-black' :
                    log.classification === 'top-secret' ? 'bg-red-500 text-white' :
                    'bg-green-500 text-black'
                  }`}>
                    {log.classification.toUpperCase()}
                  </span>
                </div>
                <p className="text-green-500 font-mono">{log.content}</p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 