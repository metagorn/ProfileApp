import { Text, View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const Home = () => {

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.gradientBackground}>
        <View style={styles.backgroundPattern} />
        
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileRing} />
              <Image 
                source={require('../assets/image/metagorn.jpg')} 
                style={styles.profileImage}
              />
              <View style={styles.statusIndicator} />
            </View>
            
            <View style={styles.nameSection}>
              <Text style={styles.name}>Metagorn Singkhan</Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.studentId}>653450100-9</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.infoCardsContainer}>
            <View style={[styles.infoCard, styles.primaryCard]}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>🎓</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Education</Text>
                <Text style={styles.cardSubtitle}>Computer & Information Science</Text>
                <Text style={styles.cardDescription}>Khon Kaen University</Text>
              </View>
            </View>
          </View>

          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            
            <View style={styles.skillCategory}>
              <Text style={styles.categoryTitle}>Frontend</Text>
              <View style={styles.skillsGrid}>
                <View style={[styles.skillChip, styles.skillReact]}>
                  <Text style={styles.skillText}>React Native</Text>
                </View>
                <View style={[styles.skillChip, styles.skillJs]}>
                  <Text style={styles.skillText}>JavaScript</Text>
                </View>
                <View style={[styles.skillChip, styles.skillHtml]}>
                  <Text style={styles.skillText}>HTML/CSS</Text>
                </View>
              </View>
            </View>

            <View style={styles.skillCategory}>
              <Text style={styles.categoryTitle}>Backend</Text>
              <View style={styles.skillsGrid}>
                <View style={[styles.skillChip, styles.skillPython]}>
                  <Text style={styles.skillText}>Python</Text>
                </View>
                <View style={[styles.skillChip, styles.skillNode]}>
                  <Text style={styles.skillText}>Node.js</Text>
                </View>
                <View style={[styles.skillChip, styles.skillDb]}>
                  <Text style={styles.skillText}>MongoDB</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.decorativeElements}>
          <View style={styles.floatingCircle1} />
          <View style={styles.floatingCircle2} />
          <View style={styles.floatingCircle3} />
          <View style={styles.gridPattern} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  gradientBackground: {
    flex: 1,
    minHeight: height,
    backgroundColor: '#0a0a0f',
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileRing: {
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    bottom: -15,
    borderRadius: 85,
    borderWidth: 3,
    borderColor: '#667eea',
    backgroundColor: 'transparent',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ade80',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  nameSection: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  badgeContainer: {
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.3)',
  },
  studentId: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '700',
    letterSpacing: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  infoCardsContainer: {
    marginBottom: 30,
    gap: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  primaryCard: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  secondaryCard: {
    backgroundColor: 'rgba(118, 75, 162, 0.1)',
    borderColor: 'rgba(118, 75, 162, 0.2)',
  },
  cardIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  skillsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  skillCategory: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 12,
    marginLeft: 4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  skillReact: {
    backgroundColor: 'rgba(97, 218, 251, 0.15)',
    borderColor: 'rgba(97, 218, 251, 0.3)',
  },
  skillJs: {
    backgroundColor: 'rgba(247, 223, 30, 0.15)',
    borderColor: 'rgba(247, 223, 30, 0.3)',
  },
  skillHtml: {
    backgroundColor: 'rgba(228, 77, 38, 0.15)',
    borderColor: 'rgba(228, 77, 38, 0.3)',
  },
  skillPython: {
    backgroundColor: 'rgba(55, 118, 171, 0.15)',
    borderColor: 'rgba(55, 118, 171, 0.3)',
  },
  skillNode: {
    backgroundColor: 'rgba(104, 160, 99, 0.15)',
    borderColor: 'rgba(104, 160, 99, 0.3)',
  },
  skillDb: {
    backgroundColor: 'rgba(74, 155, 108, 0.15)',
    borderColor: 'rgba(74, 155, 108, 0.3)',
  },
  skillText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
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
    top: 120,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.15)',
  },
  floatingCircle2: {
    position: 'absolute',
    top: 300,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(118, 75, 162, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(118, 75, 162, 0.15)',
  },
  floatingCircle3: {
    position: 'absolute',
    bottom: 200,
    right: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(102, 126, 234, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.1)',
  },
  gridPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 36px)',
  },
});

export default Home;