import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router";
import { useTheme } from "../context/AppTheme";
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get('window');

const About = () => {
  const { colors } = useTheme();
  const { token, loading } = useAuth();

  if (!token) return null;
  if (!loading && !token) return <Redirect href="/login" />;
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.gradientBackground, { backgroundColor: colors.background }]}>
        <View style={[styles.backgroundPattern, { backgroundColor: colors.backgroundPattern }]} />
        
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft} />
            <View style={styles.headerRight} />
          </View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Course Information</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={[styles.titleCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <Text style={[styles.courseTitle, { color: colors.text }]}>Hybrid Mobile Application Programming</Text>
            <Text style={[styles.courseSubtitle, { color: colors.primary }]}>with React Native</Text>
          </View>

          <View style={[styles.descriptionCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <View style={[styles.cardHeader, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.cardHeaderText, { color: colors.primary }]}>📚 คำอธิบายรายวิชา (ไทย)</Text>
            </View>
            <Text style={[styles.descriptionText, { color: colors.text }]}>
              สถาปัตยกรรมฮาร์ดแวร์ คุณลักษณะและข้อจำกัดของอุปกรณ์เคลื่อนที่ เครื่องมือและภาษาที่ใช้สำหรับพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม{'\n\n'}
              การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ภาษาหลากหลายแพลตฟอร์ม กระบวนการพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม{'\n\n'}
              การใช้หน่วยความจำและส่วนเก็บบันทึกข้อมูล การขออนุญาตและการเข้าถึงส่วนฮาร์ดแวร์ ส่วนติดต่อกับผู้ใช้ การสื่อสารเครือข่ายกับภายนอก{'\n\n'}
              การเชื่อมโยงกับระบบเครื่องแม่ข่าย การทดสอบโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ระบบคอมพิวเตอร์ ประเด็นด้านความมั่นคง การฝึกปฏิบัติ
            </Text>
          </View>

          <View style={[styles.descriptionCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <View style={[styles.cardHeader, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.cardHeaderText, { color: colors.primary }]}>🌐 Course Description (English)</Text>
            </View>
            <Text style={[styles.descriptionText, { color: colors.text }]}>
              Hardware architecture, characteristics and limitations of mobile devices, tools and languages for cross platform mobile application development.{'\n\n'}
              Cross platform language programming, cross platform application development process for mobile devices, memory and data storage management.{'\n\n'}
              User permission and hardware access permission, user interface design, communication with external systems, interfacing with server systems.{'\n\n'}
              Mobile application testing using computer system simulation, security issues, and hands-on practice sessions.
            </Text>
          </View>

          <View style={[styles.topicsCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <View style={[styles.cardHeader, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.cardHeaderText, { color: colors.primary }]}>📖 Course Topics</Text>
            </View>
            
            <View style={styles.topicsList}>
              <TouchableOpacity style={[styles.topicItem, { backgroundColor: colors.skillReact.bg, borderColor: colors.skillReact.border }]}>
                <Text style={[styles.topicIcon, { color: colors.primary }]}>⚙️</Text>
                <Text style={[styles.topicText, { color: colors.text }]}>Installation and setup</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.topicItem, { backgroundColor: colors.skillJs.bg, borderColor: colors.skillJs.border }]}>
                <Text style={[styles.topicIcon, { color: colors.primary }]}>🧭</Text>
                <Text style={[styles.topicText, { color: colors.text }]}>Expo-router</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.topicItem, { backgroundColor: colors.skillHtml.bg, borderColor: colors.skillHtml.border }]}>
                <Text style={[styles.topicIcon, { color: colors.primary }]}>🎨</Text>
                <Text style={[styles.topicText, { color: colors.text }]}>Components and Style</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.topicItem, { backgroundColor: colors.skillPython.bg, borderColor: colors.skillPython.border }]}>
                <Text style={[styles.topicIcon, { color: colors.primary }]}>🔨</Text>
                <Text style={[styles.topicText, { color: colors.text }]}>Building</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.topicItem, { backgroundColor: colors.skillNode.bg, borderColor: colors.skillNode.border }]}>
                <Text style={[styles.topicIcon, { color: colors.primary }]}>📱</Text>
                <Text style={[styles.topicText, { color: colors.text }]}>Page and Navigation</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.topicItem, { backgroundColor: colors.skillDb.bg, borderColor: colors.skillDb.border }]}>
                <Text style={[styles.topicIcon, { color: colors.primary }]}>📐</Text>
                <Text style={[styles.topicText, { color: colors.text }]}>Layouts and Stack</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.decorativeElements}>
          <View style={[styles.floatingCircle1, { backgroundColor: colors.floatingCircle1.bg, borderColor: colors.floatingCircle1.border }]} />
          <View style={[styles.floatingCircle2, { backgroundColor: colors.floatingCircle2.bg, borderColor: colors.floatingCircle2.border }]} />
          <View style={[styles.floatingCircle3, { backgroundColor: colors.floatingCircle1.bg, borderColor: colors.floatingCircle1.border }]} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    minHeight: height,
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 30,
    position: 'relative',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    width: 40,
  },
  headerRight: {
    width: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  courseSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionCard: {
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  topicsCard: {
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  infoGrid: {
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: '800',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    padding: 20,
    textAlign: 'left',
    letterSpacing: 0.3,
  },
  topicsList: {
    padding: 20,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  topicIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  topicText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    width: 120,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  floatingCircle1: {
    position: 'absolute',
    top: 150,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
  },
  floatingCircle2: {
    position: 'absolute',
    top: 400,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
  },
  floatingCircle3: {
    position: 'absolute',
    bottom: 150,
    right: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default About;
