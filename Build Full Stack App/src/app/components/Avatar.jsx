import { motion } from "motion/react";
import styles from "./Avatar.module.css";
import avatarImg from "./avtar4.png";  // ✅ Fixed path

function Avatar() {
  return (
    <motion.div className={styles.avatarWrapper}>
      <div className={styles.avatarCircle}>
        <img src={avatarImg} alt="Avatar" />
      </div>
    </motion.div>
  );
}

export default Avatar;