import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router";
import { useTheme } from "../context/AppTheme";
import { useAuth } from "../context/AuthContext";


const Home = () => {
  const { colors } = useTheme();
  const { token, loading } = useAuth();
  
  if (!loading && !token) return <Redirect href="/login" />;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.backgroundPattern, { backgroundColor: colors.surface }]} />
        
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
            <View style={styles.headerRight} />
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={[styles.profileGlow, { backgroundColor: colors.primary, shadowColor: colors.primary }]} />
            <View style={[styles.profileRing, { borderColor: colors.primary }]} />
            <Image 
              source={require('../assets/image/metagorn.jpg')} 
              style={[styles.profileImage, { borderColor: colors.background }]}
            />
            <View style={[styles.statusIndicator, { borderColor: colors.background }]} />
          </View>
          
          <View style={styles.nameSection}>
            <Text style={[styles.name, { color: colors.text }]}>Metagorn Singkhan</Text>
            <View style={[styles.badgeContainer, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
              <Text style={[styles.studentId, { color: colors.primary }]}>653450100-9</Text>
            </View>
            <Text style={[styles.title, { color: colors.textSecondary }]}>Computer Science</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={[styles.educationCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <View style={[styles.cardHeader, { backgroundColor: colors.primaryLight }]}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>🎓</Text>
              </View>
              <View style={styles.cardHeaderText}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Education</Text>
                <Text style={[styles.cardSubtitle, { color: colors.primary }]}>Current Studies</Text>
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.universityName, { color: colors.text }]}>Khon Kaen University</Text>
              <Text style={[styles.programName, { color: colors.textSecondary }]}>Computer & Information Science</Text>
            </View>
          </View>

          <View style={styles.skillsSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Technical Skills</Text>
            </View>
            
            <View style={styles.skillCategory}>
              <Text style={[styles.categoryTitle, { color: colors.textSecondary }]}>Frontend Development</Text>
              <View style={styles.skillsGrid}>
                <View style={[styles.skillChip, { 
                  backgroundColor: colors.skillReact?.bg || 'rgba(97, 218, 251, 0.15)', 
                  borderColor: colors.skillReact?.border || 'rgba(97, 218, 251, 0.3)' 
                }]}>
                  <Text style={[styles.skillText, { color: colors.text }]}>⚛️ React Native</Text>
                </View>
                <View style={[styles.skillChip, { 
                  backgroundColor: colors.skillJs?.bg || 'rgba(247, 223, 30, 0.15)', 
                  borderColor: colors.skillJs?.border || 'rgba(247, 223, 30, 0.3)' 
                }]}>
                  <Text style={[styles.skillText, { color: colors.text }]}>🟨 JavaScript</Text>
                </View>
                <View style={[styles.skillChip, { 
                  backgroundColor: colors.skillHtml?.bg || 'rgba(255, 99, 71, 0.15)', 
                  borderColor: colors.skillHtml?.border || 'rgba(255, 99, 71, 0.3)' 
                }]}>
                  <Text style={[styles.skillText, { color: colors.text }]}>🌐 HTML/CSS</Text>
                </View>
              </View>
            </View>

            <View style={styles.skillCategory}>
              <Text style={[styles.categoryTitle, { color: colors.textSecondary }]}>Backend Development</Text>
              <View style={styles.skillsGrid}>
                <View style={[styles.skillChip, { 
                  backgroundColor: colors.skillPython?.bg || 'rgba(55, 118, 171, 0.15)', 
                  borderColor: colors.skillPython?.border || 'rgba(55, 118, 171, 0.3)' 
                }]}>
                  <Text style={[styles.skillText, { color: colors.text }]}>🐍 Python</Text>
                </View>
                <View style={[styles.skillChip, { 
                  backgroundColor: colors.skillNode?.bg || 'rgba(104, 160, 99, 0.15)', 
                  borderColor: colors.skillNode?.border || 'rgba(104, 160, 99, 0.3)' 
                }]}>
                  <Text style={[styles.skillText, { color: colors.text }]}>💚 Node.js</Text>
                </View>
                <View style={[styles.skillChip, { 
                  backgroundColor: colors.skillDb?.bg || 'rgba(79, 121, 66, 0.15)', 
                  borderColor: colors.skillDb?.border || 'rgba(79, 121, 66, 0.3)' 
                }]}>
                  <Text style={[styles.skillText, { color: colors.text }]}>🍃 MongoDB</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.navigationContainer}>
            <Link
              href="/about"
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.buttonText}>Go To 📚 About Page</Text>
            </Link>
            <View style={{ height: 10 }} />
            <Link
              href="/books"
              style={[styles.button, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.buttonText}>Manage Books</Text>
            </Link>
          </View>
        </View>

        <View style={styles.decorativeElements}>
          <View style={[styles.floatingCircle1, { 
            backgroundColor: colors.floatingCircle1?.bg || 'rgba(102, 126, 234, 0.1)', 
            borderColor: colors.floatingCircle1?.border || 'rgba(102, 126, 234, 0.2)' 
          }]} />
          <View style={[styles.floatingCircle2, { 
            backgroundColor: colors.floatingCircle2?.bg || 'rgba(245, 101, 101, 0.1)', 
            borderColor: colors.floatingCircle2?.border || 'rgba(245, 101, 101, 0.2)' 
          }]} />
          <View style={[styles.floatingCircle3, { 
            backgroundColor: colors.floatingCircle1?.bg || 'rgba(102, 126, 234, 0.1)', 
            borderColor: colors.floatingCircle1?.border || 'rgba(102, 126, 234, 0.2)' 
          }]} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },
  
  // Header Styles
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },

  // Profile Styles
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  profileGlow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 90,
    opacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 15,
  },
  profileRing: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 78,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10b981',
    borderWidth: 4,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  nameSection: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  badgeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1.5,
    marginBottom: 8,
  },
  studentId: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Stats Styles
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Content Styles
  contentContainer: {
    paddingHorizontal: 20,
  },
  
  // Education Card Styles
  educationCard: {
    borderRadius: 24,
    marginBottom: 30,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    padding: 20,
  },
  universityName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  programName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  yearInfo: {
    fontSize: 14,
    fontWeight: '500',
  },

  // Skills Styles
  skillsSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  skillCategory: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    marginLeft: 4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Navigation Button Styles
  navigationContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    zIndex: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },


  // Decorative Styles
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
    top: 120,
    right: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    opacity: 0.6,
  },
  floatingCircle2: {
    position: 'absolute',
    top: 300,
    left: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    opacity: 0.4,
  },
  floatingCircle3: {
    position: 'absolute',
    bottom: 150,
    right: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    opacity: 0.3,
  },
});

export default Home;