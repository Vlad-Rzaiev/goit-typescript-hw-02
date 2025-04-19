import React from 'react';
import styles from './Section.module.css';

type sectionProps = {
  children: React.ReactNode;
};

export default function Section({ children }: sectionProps) {
  return <section className={styles.section}>{children}</section>;
}
