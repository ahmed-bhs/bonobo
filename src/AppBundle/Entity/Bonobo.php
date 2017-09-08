<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * Bonobo
 *
 * @ORM\Table(name="bonobo")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BonoboRepository")
 * @Vich\Uploadable
 * 
 */
class Bonobo extends BaseUser
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;


   /**
     * @var int
     *
     * @ORM\Column(name="age", type="integer", nullable=true)
     */
    private $age;

    /**
     * @var string
     *
     * @ORM\Column(name="famille", type="string", length=255, nullable=true)
     */
    private $famille;

    /**
     * @var string
     *
     * @ORM\Column(name="race", type="string", length=255, nullable=true)
     */
    private $race;

    /**
     * @var string
     *
     * @ORM\Column(name="nourriture", type="string", length=255, nullable=true)
     */
    private $nourriture;

    /**
     * @ORM\ManyToMany(targetEntity="AppBundle\Entity\Bonobo")
     */
    private $friendList;

    /**
     * 
     *
     * @Assert\File(
     *     maxSize = "1024k",
     * )
     * @Assert\File(maxSize="1M")
     * @Vich\UploadableField(mapping="upload_files", fileNameProperty="fileName", size="imageSize")
     * 
     * @var File
     */
    protected $file;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * 
     * @var string
     */
    protected $fileName;

   /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */

    private $createdAt;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     *
     * @var \DateTime
     */
    private $updatedAt;
    

    public function __construct()
    {   
        parent::__construct();
        $this->createdAt= new \DateTime();
        $this->createdAt= new \DateTime();
        $this->friendList = new ArrayCollection();

    }

    public function getName()
    {
       return 'bonobo n° '.$this->id;
    }


    public function setUsername($username){
        parent::setUsername($username);
        $this->setEmail($username.'@fake.fr');
    }
 

    /**
     * Set age
     *
     * @param integer $age
     *
     * @return Bonobo
     */
    public function setAge($age)
    {
        $this->age = $age;

        return $this;
    }

    /**
     * Get age
     *
     * @return integer
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * Set famille
     *
     * @param string $famille
     *
     * @return Bonobo
     */
    public function setFamille($famille)
    {
        $this->famille = $famille;

        return $this;
    }

    /**
     * Get famille
     *
     * @return string
     */
    public function getFamille()
    {
        return $this->famille;
    }

    /**
     * Set race
     *
     * @param string $race
     *
     * @return Bonobo
     */
    public function setRace($race)
    {
        $this->race = $race;

        return $this;
    }

    /**
     * Get race
     *
     * @return string
     */
    public function getRace()
    {
        return $this->race;
    }

    /**
     * Set nourriture
     *
     * @param string $nourriture
     *
     * @return Bonobo
     */
    public function setNourriture($nourriture)
    {
        $this->nourriture = $nourriture;

        return $this;
    }

    /**
     * Get nourriture
     *
     * @return string
     */
    public function getNourriture()
    {
        return $this->nourriture;
    }

    /**
     * Add friendList
     *
     * @param \AppBundle\Entity\Bonobo $friendList
     *
     * @return Bonobo
     */
    public function addFriendList(\AppBundle\Entity\Bonobo $friendList)
    {
        $this->friendList[] = $friendList;

        return $this;
    }

    /**
     * Remove friendList
     *
     * @param \AppBundle\Entity\Bonobo $friendList
     */
    public function removeFriendList(\AppBundle\Entity\Bonobo $friendList)
    {
        $this->friendList->removeElement($friendList);
    }

    /**
     * Get friendList
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFriendList()
    {
        return $this->friendList;
    }



    /**
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     *
     * 
     */
    public function setFile(File $image = null)
    {
        $this->file = $image;
        $this->createdAt = new \DateTimeImmutable();

        if ($image) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
        
        return $this;
    }

    /**
     * @return File|null
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * @param string $fileName
     *
     * 
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;
        
        return $this;
    }

    /**
     * @return string|null
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /** 
     * Get updatedAt 
     * 
     * @return \DateTime 
     */  
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /** 
     * Set updatedAt 
     * 
     * @ORM\PreUpdate 
     */  
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

   

    /** 
     * Set createdAt 
     * 
     * @ORM\PrePersist 
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}
